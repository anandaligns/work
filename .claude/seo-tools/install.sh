#!/usr/bin/env bash
# Installs the SEO skill packs into this project's .claude/ folder (project scope, not ~/.claude).
#
#   claude-seo            AgriciDaniel/claude-seo           technical SEO (26 skills, 19 agents) + its Firecrawl extension
#   geo-seo-claude        zubair-trabzada/geo-seo-claude    AI-search (GEO) optimisation
#   firecrawl-workflows   firecrawl/firecrawl-workflows     competitive intel, keyword/SERP and crawl workflows
#
# Each repo is pinned to the commit that was reviewed. To update, bump a SHA below and re-run.
# Re-running removes only the paths listed in installed.txt, so hand-added skills are untouched.
# The upstream installers are not used: they write to ~/.claude and build a venv with the Mac's
# Python. Here the Python helpers run in Docker instead (see Dockerfile and ./run).
set -euo pipefail

CLAUDE_SEO_SHA=4b99de2f7de7e7d5247042e5fb5b4ea9368ef734
GEO_SEO_SHA=ea29bd291a0b52648ef92a80d84a2e1f89ef754b
FIRECRAWL_SHA=94cc91229d6cedc0613f140d3d013b150bc8e1b0

tools="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
claude_dir="$(dirname "$tools")"
skills="$claude_dir/skills"
agents="$claude_dir/agents"
manifest="$tools/installed.txt"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

fetch() {
  local repo="$1" sha="$2" dir="$tmp/$3"
  git init -q "$dir"
  git -C "$dir" fetch -q --depth 1 "https://github.com/$repo.git" "$sha"
  git -C "$dir" checkout -q FETCH_HEAD
  echo "fetched $repo @ ${sha:0:7}"
}

fetch AgriciDaniel/claude-seo "$CLAUDE_SEO_SHA" claude-seo
fetch zubair-trabzada/geo-seo-claude "$GEO_SEO_SHA" geo
fetch firecrawl/firecrawl-workflows "$FIRECRAWL_SHA" firecrawl

# Remove what the previous run installed.
if [[ -f "$manifest" ]]; then
  while IFS= read -r rel; do
    [[ -n "$rel" && "$rel" != *..* ]] && rm -rf -- "${claude_dir:?}/$rel"
  done < "$manifest"
fi
: > "$manifest"
mkdir -p "$skills" "$agents"

add_skill() { # <source dir> <name>
  rm -rf -- "${skills:?}/$2"
  cp -R "$1" "$skills/$2"
  echo "skills/$2" >> "$manifest"
}
add_agent() { # <source file>
  cp "$1" "$agents/"
  echo "agents/$(basename "$1")" >> "$manifest"
}

# --- claude-seo: same layout as its manual installer, rooted at .claude/skills/seo ---
src="$tmp/claude-seo"
seo_skills=(seo seo-firecrawl)
add_skill "$src/skills/seo" seo
for d in "$src"/skills/*/; do
  name="$(basename "$d")"
  [[ "$name" == seo ]] && continue
  add_skill "$d" "$name"
  seo_skills+=("$name")
done
add_skill "$src/extensions/firecrawl/skills/seo-firecrawl" seo-firecrawl
for f in "$src"/agents/*.md; do add_agent "$f"; done
cp -R "$src/scripts" "$src/schema" "$src/data" "$skills/seo/"
cp "$src/requirements.txt" "$skills/seo/requirements.txt"
cp "$src/.claude-plugin/plugin.json" "$skills/seo/runtime-plugin.json"
rm -f "$skills/seo/scripts/release_sign.py" "$skills/seo/scripts/verify_release.py"

# The launcher looks for a host Python 3.10+. Point it at the Docker one unless overridden,
# and make `setup` rebuild the image (a venv built in a throwaway container would be lost).
launcher="$skills/seo/scripts/claude-seo"
PATCH='if [[ -z "${CLAUDE_SEO_PYTHON:-}" && -x "${launcher_dir}/../../../seo-tools/run" ]]; then
    # Project install (.claude/seo-tools): Python runs in Docker.
    [[ "${1:-}" == setup ]] && exec "${launcher_dir}/../../../seo-tools/run" --build
    CLAUDE_SEO_PYTHON="${launcher_dir}/../../../seo-tools/python"
fi
' perl -pi -e 'print $ENV{PATCH} if /^# An override is an executable path/' "$launcher"
grep -q 'seo-tools/python' "$launcher" || { echo "launcher patch failed" >&2; exit 1; }
chmod +x "$launcher"

# Plugin-root tokens become project-relative paths (Bash runs from the project root).
seo_docs=()
while IFS= read -r -d '' f; do seo_docs+=("$f"); done < <(
  for n in "${seo_skills[@]}"; do find "$skills/$n" -name '*.md' -print0; done
  find "$agents" -name 'seo-*.md' -print0
)
sed -i '' \
  -e 's#"${CLAUDE_PLUGIN_ROOT}/scripts/claude-seo"#.claude/skills/seo/scripts/claude-seo#g' \
  -e 's#${CLAUDE_PLUGIN_ROOT}/skills/#.claude/skills/#g' \
  -e 's#${CLAUDE_PLUGIN_ROOT}#.claude/skills/seo#g' \
  "${seo_docs[@]}"

# --- geo-seo-claude: main skill rooted at .claude/skills/geo ---
src="$tmp/geo"
geo_skills=(geo)
add_skill "$src/geo" geo
for d in "$src"/skills/*/; do
  name="$(basename "$d")"
  # geo-update self-updates a ~/.claude install; this copy is updated by re-running this script.
  [[ "$name" == geo-update ]] && continue
  add_skill "$d" "$name"
  geo_skills+=("$name")
done
for f in "$src"/agents/*.md; do add_agent "$f"; done
cp -R "$src/scripts" "$src/schema" "$src/templates" "$skills/geo/"
cp "$src/requirements.txt" "$skills/geo/requirements.txt"

geo_docs=()
while IFS= read -r -d '' f; do geo_docs+=("$f"); done < <(
  for n in "${geo_skills[@]}"; do find "$skills/$n" -name '*.md' -print0; done
  find "$agents" -name 'geo-*.md' -print0
)
sed -i '' \
  -e 's#python3 ~/\.claude/skills/geo/scripts/#.claude/seo-tools/python .claude/skills/geo/scripts/#g' \
  -e 's#python3 -c #.claude/seo-tools/python -c #g' \
  -e 's#python3 -m #.claude/seo-tools/python -m #g' \
  -e 's#^\( *\)pandoc #\1.claude/seo-tools/run pandoc #' \
  -e 's#~/\.claude/skills/geo#.claude/skills/geo#g' \
  "${geo_docs[@]}"

# --- firecrawl-workflows: skills only ---
for d in "$tmp"/firecrawl/skills/*/; do add_skill "$d" "$(basename "$d")"; done

sort -o "$manifest" "$manifest"
echo "installed $(grep -c '^skills/' "$manifest") skills and $(grep -c '^agents/' "$manifest") agents into $claude_dir"
echo "next: $tools/run --build   (builds the Python tools image)"

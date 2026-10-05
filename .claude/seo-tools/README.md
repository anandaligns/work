# SEO skills for this project

Installed at project scope by `install.sh`. They live in `.claude/skills` and `.claude/agents`, not in `~/.claude`.

| Pack | Source (pinned commit in `install.sh`) | Entry point |
| --- | --- | --- |
| claude-seo: technical SEO, 27 skills, 19 agents | AgriciDaniel/claude-seo | `/seo` (`/seo audit <url>`, `/seo technical`, `/seo schema`, `/seo cluster`, …) |
| geo-seo-claude: AI-search optimisation, 15 skills, 5 agents | zubair-trabzada/geo-seo-claude | `/geo` (`/geo audit <url>`, `/geo citability`, `/geo llmstxt`, …) |
| firecrawl-workflows: competitive intel, keyword/SERP and crawl, 16 skills | firecrawl/firecrawl-workflows | `/firecrawl-workflows`, `/firecrawl-seo-audit`, `/firecrawl-competitive-intel`, … |
| seo-health-check: checklist-style SEO audit | attached `SKILL.md` (renamed from `seo-audit`, which claude-seo already uses) | `/seo-health-check` |

## Runtimes (Docker, nothing installed on the Mac)

- **Python helpers.** `./python` and `./run` use the `pixel-kinetix-seo-tools` image: Python 3.12, both packs' requirements, Chromium and pandoc. claude-seo's launcher (`.claude/skills/seo/scripts/claude-seo`) is patched to use it, and `claude-seo setup` rebuilds it. API keys and drift baselines saved by the scripts go in the `pixel-kinetix-seo-config` and `pixel-kinetix-seo-cache` volumes.
- **Firecrawl.** `.mcp.json` starts `./firecrawl-mcp`, which runs `firecrawl-mcp@3.11.0` in `node:22-alpine`.
- **Keys.** Both runtimes read `.env` in this folder (gitignored). Copy `.env.example` and fill in what you use.

The scripts run inside a container, so `localhost` there is the container itself. To reach the local dev server, use `http://host.docker.internal:<port>` and list that host in `CLAUDE_SEO_LOCAL_TARGETS`, because claude-seo's fetchers refuse private addresses unless you opt in. Firecrawl is a hosted service and can only reach public URLs.

## Updating

Bump a SHA in `install.sh`, read what changed upstream, then run:

```bash
.claude/seo-tools/install.sh
.claude/seo-tools/run --build
```

The installer replaces only the paths in `installed.txt`, so `seo-health-check` and any other hand-added skill stay as they are.

## Not installed

- claude-seo's `PostToolUse` schema-validation hook: it calls `node`, which is not on this Mac.
- The `seo-cockpit` companion plugin.
- Every claude-seo extension except Firecrawl (Ahrefs, DataForSEO MCP, SE Ranking and the rest each need their own account and MCP server).
- geo's `geo-update` skill, which updates a `~/.claude` install.

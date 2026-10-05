# Python 3.12 toolbox for the helper scripts of the SEO skills in .claude/skills.
# The Mac has only Python 3.9 and nothing is installed globally, so the dependencies live here.
# Built by ./run --build with .claude/skills/seo as context and .claude/skills/geo as "geo".
FROM python:3.12-slim-bookworm

ENV PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONUNBUFFERED=1 \
    CLAUDE_SEO_DATA_DIR=/opt/claude-seo \
    PLAYWRIGHT_BROWSERS_PATH=/opt/claude-seo/ms-playwright

# pandoc renders the GEO report; pango and harfbuzz are what weasyprint needs for claude-seo's PDFs.
RUN apt-get update \
 && apt-get install -y --no-install-recommends pandoc libpango-1.0-0 libpangoft2-1.0-0 libharfbuzz-subset0 fonts-dejavu-core \
 && rm -rf /var/lib/apt/lists/*

# claude-seo's own runtime builds its venv and Chromium, the same steps as `/seo setup`.
COPY requirements.txt runtime-plugin.json /opt/claude-seo-src/
COPY scripts/runtime.py /opt/claude-seo-src/scripts/
RUN python /opt/claude-seo-src/scripts/runtime.py setup \
 && /opt/claude-seo/.venv/bin/python -m playwright install-deps chromium \
 && rm -rf /var/lib/apt/lists/*

# geo-seo-claude's scripts use the image's Python, pinned to claude-seo's Playwright so they share Chromium.
COPY --from=geo requirements.txt /tmp/geo-requirements.txt
RUN pw="$(/opt/claude-seo/.venv/bin/python -m pip show playwright | sed -n 's/^Version: //p')" \
 && pip install -r /tmp/geo-requirements.txt "playwright==$pw" \
 && rm /tmp/geo-requirements.txt

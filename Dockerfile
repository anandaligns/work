# Production image for the Pixel Kinetix UI (liquidglass.pixelkinetix.com and later the live site).
# Local development is unaffected: that is compose.yaml, with node_modules in a named volume.
#
# Built once, run anywhere: the dependencies are installed and the site is built inside the image,
# and the runtime stage carries only Next's standalone server, its static files and public/.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-alpine AS build
WORKDIR /app
# The address the pages are built for (canonicals, sitemap, robots, structured data). Empty means
# https://pixelkinetix.com; the staging copy builds with
# --build-arg NEXT_PUBLIC_SITE_URL=https://liquidglass.pixelkinetix.com
ARG NEXT_PUBLIC_SITE_URL=
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
# The share images read their fonts from here if one is drawn after the build.
COPY --from=build --chown=app:app /app/src/assets ./src/assets
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]

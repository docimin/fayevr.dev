# syntax=docker.io/docker/dockerfile:1

FROM oven/bun:1-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Nitro's bun preset bundles its own traced node_modules into .output/server,
# so the runtime stage needs nothing from the builder but .output.
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=bun:bun /app/.output ./.output

USER bun
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["bun", ".output/server/index.mjs"]

FROM node:24.14.1-alpine3.23 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_DISABLE_SELF_UPDATE_CHECK=true
ENV PNPM_STORE_PATH=/pnpm/store
ENV CI=true
ENV SCARF_ANALYTICS=false

RUN corepack enable

WORKDIR /app


FROM base AS deps

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm fetch

COPY backend/package.json ./backend/

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter=@nosql/backend


FROM deps AS build

COPY backend ./backend

RUN pnpm run --filter=@nosql/backend build

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm deploy --filter=@nosql/backend --prod /app/deploy


# FROM node:24.14.1-alpine3.23 AS prod
FROM oven/bun:1.3.12-distroless AS prod

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/deploy/node_modules ./node_modules
COPY --from=build /app/deploy/dist ./dist

EXPOSE 3000

# CMD ["node", "dist/main.js"]
CMD ["dist/main.js"]

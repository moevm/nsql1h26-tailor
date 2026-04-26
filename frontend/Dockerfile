FROM node:24.14.1-alpine3.23 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_DISABLE_SELF_UPDATE_CHECK=true
ENV PNPM_STORE_PATH=/pnpm/store
ENV CI=true

RUN corepack enable

WORKDIR /app


FROM base AS deps

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm fetch

COPY frontend/package.json ./frontend/

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter=@nosql/frontend


FROM deps AS build

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY frontend ./frontend

RUN pnpm run --filter=@nosql/frontend build


FROM nginx:1.28.3-alpine-slim AS production

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

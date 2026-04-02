FROM node:lts-alpine3.23 AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_DISABLE_SELF_UPDATE_CHECK=true
ENV PNPM_STORE_PATH=/pnpm/store
ENV CI=true

RUN corepack enable

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

COPY frontend/package.json ./frontend/

RUN pnpm install --frozen-lockfile --filter=@nosql/frontend

COPY frontend ./frontend

RUN pnpm run build --filter=@nosql/frontend

FROM nginx:1.28.3-alpine-slim AS production

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
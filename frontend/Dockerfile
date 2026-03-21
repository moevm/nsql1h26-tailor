FROM node:lts-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

COPY frontend/package.json ./frontend/

RUN pnpm install --frozen-lockfile --filter=@nosql/frontend

COPY . .

RUN pnpm deploy --filter=@nosql/frontend /app/deployed

WORKDIR /app/deployed
RUN pnpm run build


FROM nginx:stable-alpine AS production

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/deployed/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
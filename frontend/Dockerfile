FROM node:lts-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY . .

WORKDIR /app/frontend

RUN pnpm install --filter @nosql/frontend --frozen-lockfile

RUN pnpm build


FROM nginx:stable-alpine AS production

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
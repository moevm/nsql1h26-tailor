FROM node:lts-alpine3.23 AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

COPY backend/package.json ./backend/

RUN pnpm install --frozen-lockfile --filter=@nosql/backend

COPY backend ./backend

RUN pnpm run build

RUN pnpm deploy --filter=@nosql/backend --prod /app/deployed

FROM node:lts-alpine3.23 AS production

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

RUN corepack enable

WORKDIR /app

COPY --from=build /app/deployed ./

EXPOSE 3000

CMD ["node", "dist/main.js"]
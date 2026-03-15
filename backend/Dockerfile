FROM node:lts-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm --filter=@nosql/backend run build
RUN pnpm deploy --filter=@nosql/backend --prod /app/deployed


FROM node:lts-alpine AS production

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

RUN corepack enable

RUN apk add --no-cache curl

WORKDIR /app

COPY --from=build /app/deployed ./
COPY --from=build /app/backend/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
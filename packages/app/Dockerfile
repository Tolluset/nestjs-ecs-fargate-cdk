FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable

USER node

COPY --chown=node:node . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --chown=node:node --from=prod-deps /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/dist /app/dist

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 80 
CMD [ "pnpm", "start" ]


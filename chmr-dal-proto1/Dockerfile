FROM oven/bun
WORKDIR /usr/src/app

ADD . .
ADD package.json package.json
ADD bun.lockb bun.lockb
RUN bun install
RUN bun install redis
RUN bun install uuid
RUN bun install @types/uuid


# run the app
USER bun
EXPOSE 2000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]
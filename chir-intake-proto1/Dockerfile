FROM oven/bun
WORKDIR /usr/src/app

ADD . .
ADD package.json package.json
ADD bun.lockb bun.lockb
RUN bun install

# run the app
USER bun
EXPOSE 8080/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]
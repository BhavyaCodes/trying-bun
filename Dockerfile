FROM oven/bun

WORKDIR /usr/app

RUN apt-get update

RUN apt-get install -y redis

# Root
COPY ./package.json ./package.json
COPY ./bun.lockb ./bun.lockb


# packages
COPY ./packages/client/package.json ./packages/client/package.json
COPY ./packages/server/package.json ./packages/server/package.json
COPY ./packages/shared/package.json ./packages/shared/package.json

RUN bun install

COPY ./ ./

RUN chmod 777 start.sh


RUN bun run build

CMD ./start.sh
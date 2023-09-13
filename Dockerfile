FROM oven/bun

WORKDIR /usr/app

RUN apt-get update

RUN apt-get install -y redis

COPY ./ ./

RUN chmod 777 start.sh

RUN bun install

RUN bun run build

CMD ./start.sh
FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

COPY app/package*.json app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY ./app .
COPY ./script.sh .

RUN chmod +x ./script.sh

CMD ["/app/script.sh"]
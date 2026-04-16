FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY ./app .
COPY ./script.sh .

RUN chmod +x ./script.sh

RUN npm ci

CMD ["/app/script.sh"]
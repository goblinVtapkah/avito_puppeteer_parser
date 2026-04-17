FROM node:20-alpine

WORKDIR /app

COPY ./app .
COPY ./script.sh .

RUN chmod +x ./script.sh

RUN npm i

CMD ["/app/script.sh"]
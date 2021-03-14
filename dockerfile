FROM node:alpine

WORKDIR /usr/app

COPY . .

RUN yarn install

EXPOSE 3333

USER node

CMD yarn dev

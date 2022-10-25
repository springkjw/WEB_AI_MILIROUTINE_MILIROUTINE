FROM node:16-alpine

RUN apk update && apk add bash

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .

RUN npm install --no-cache
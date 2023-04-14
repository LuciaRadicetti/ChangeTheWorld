FROM node:14.20-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

RUN npm install -g json-server

COPY . /app

RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/ChangeTheWorld /usr/share/nginx/html

CMD ["npm", "run", "start:json-server"]
ARG NODE_VERSION=18.18
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
COPY package.json package-lock.json .husky ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine3.17-slim as nginx
RUN addgroup -g 1000 -S www-data \
 && adduser -u 1000 -D -S -G www-data www-data
COPY --from=base /usr/src/app/build /usr/share/nginx/html

ARG NODE_VERSION=18.18
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
COPY package.json package-lock.json .husky ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.18.0-alpine as nginx
COPY --from=base /usr/src/app/build /usr/share/nginx/html
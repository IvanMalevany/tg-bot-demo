
FROM node:18.16.0-alpine

WORKDIR /app

COPY /etc/docker-entrypoint.sh /opt/docker-entrypoint.sh
COPY package*.json ./
COPY dist/ dist/
COPY src/public/ dist/src/public/
COPY .npmrc .
COPY .sequelizerc .
COPY db/ db/

RUN npm ci

EXPOSE 5000

ENTRYPOINT [ "sh", "/opt/docker-entrypoint.sh" ]
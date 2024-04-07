FROM node:18
RUN apt-get update && apt-get install -y \
	libcairo2-dev \
	libjpeg-dev \
	libpango1.0-dev \
	libgif-dev \
	libpng-dev \
	build-essential \
	g++
WORKDIR /pixel-punch/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn lerna bootstrap
RUN yarn build


#ARG NODE_VERSION=18.18.2
#ARG SERVER_PORT=3001
#
#FROM node:$NODE_VERSION-buster as base
#
#WORKDIR /app
#
#FROM base as builder
#
#COPY package.json yarn.lock ./
#RUN yarn install --frozen-lockfile
#
#COPY . .
#
#RUN yarn lerna bootstrap
#RUN rm -rf /app/packages/server/dist/ && yarn build --scope=server
#
#
#FROM node:$NODE_VERSION-buster-slim as production
#WORKDIR /app
#
#COPY --from=builder /app/packages/server/dist/ /app/
#COPY --from=builder /app/packages/server/package.json /app/package.json
#RUN yarn install --production=true
#
#EXPOSE $SERVER_PORT
#CMD [ "node", "/app/index.js" ]

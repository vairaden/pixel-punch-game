FROM node:18.18.2

RUN apt-get update && apt-get install -y \
	libcairo2-dev \
	libjpeg-dev \
	libpango1.0-dev \
	libgif-dev \
	libpng-dev \
	build-essential \
	g++

WORKDIR /pixel-punch/app

COPY package.json yarn.lock lerna.json ./

RUN yarn

RUN yarn lerna bootstrap

COPY . .

RUN yarn build



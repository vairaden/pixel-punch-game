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

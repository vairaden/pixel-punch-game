ARG NODE_VERSION=18.18.2
ARG SERVER_PORT=3001

FROM node:$NODE_VERSION as builder
WORKDIR /app

RUN apt-get update && apt-get install -y \
	libcairo2-dev \
	libjpeg-dev \
	libpango1.0-dev \
	libgif-dev \
	libpng-dev \
	build-essential \
	g++

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn lerna bootstrap

RUN rm -rf /app/packages/server/dist/ && rm -rf /app/packages/server/dist/ && yarn build

FROM node:$NODE_VERSION as production
WORKDIR /app

COPY --from=builder /app/packages/server/dist/ /app/server/dist/
COPY --from=builder /app/packages/server/package.json /app/server

COPY --from=builder /app/packages/client/dist/ /app/client/
COPY --from=builder /app/packages/client/package.json /app/client/

RUN cd server && yarn install --production=true

EXPOSE $SERVER_PORT

CMD [ "node", "--experimental-specifier-resolution=node", "/app/server/dist/src/index.js" ]

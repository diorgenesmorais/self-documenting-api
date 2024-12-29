FROM node:20.14.0-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Create app directory
WORKDIR /usr/app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20.14.0-alpine

# Install pnpm
RUN npm install -g pnpm

ENV NODE_ENV=production

WORKDIR /usr/app

# Install app dependencies
COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --from=builder /usr/app/dist ./dist

USER node

EXPOSE 8080

CMD [ "node", "dist/server.js" ]
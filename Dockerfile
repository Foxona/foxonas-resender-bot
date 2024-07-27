FROM node:14-alpine as build

WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:14-alpine as production

WORKDIR /home/node/app
COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/node_modules ./node_modules
COPY .env ./.env

ENTRYPOINT ["node", "dist/index.js"]
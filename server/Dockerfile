FROM node:18.16.0-alpine as prebuild
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18.16.0-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
COPY set_secrets_to_env.sh .
COPY --from=prebuild /usr/src/app/dist ./dist
CMD ["npm", "run", "start:prod"]
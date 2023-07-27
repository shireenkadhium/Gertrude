FROM node:18.16.0-alpine as prebuild
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nikolaik/python-nodejs:python3.11-nodejs18-slim as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
COPY --from=prebuild /usr/src/app/dist ./dist
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r /usr/src/app/llama-index/requirements.txt
CMD ["npm", "run", "start:prod"]


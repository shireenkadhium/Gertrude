FROM node:18.16.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL $VITE_API_BASE_URL
RUN npm run build

FROM nginx:1.25-alpine as production
WORKDIR /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
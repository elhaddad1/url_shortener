FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build --dev
FROM nginx:1.23

COPY --from=build /app/dist/url_shortener_portal /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

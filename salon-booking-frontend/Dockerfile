# Stage 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG PUBLIC_URL=/
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.29-alpine
COPY --from=build /app/build /usr/share/nginx/html

# ใช้ config สำหรับ React subpath
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

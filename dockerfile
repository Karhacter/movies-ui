# frontend/Dockerfile
FROM node:18-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

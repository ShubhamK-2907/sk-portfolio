FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps --no-cache

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM nginx:stable-alpine AS runner

COPY --from=builder /app/out /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

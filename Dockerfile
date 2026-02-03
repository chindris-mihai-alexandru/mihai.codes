# Labels for GitHub Container Registry
LABEL org.opencontainers.image.source="https://github.com/Mihai-Codes/mihai.codes"
LABEL org.opencontainers.image.description="Personal portfolio & blog | Qwik + Tailwind CSS + Cloudflare Pages"
LABEL org.opencontainers.image.licenses="MIT"

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the static site
RUN npm run build && npm run build.client

# Production stage - serve with nginx
FROM nginx:alpine

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

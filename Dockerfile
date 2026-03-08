# ============================================================
# Stage 1: Build the Angular application
# ============================================================
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency manifests first (better layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build for production
RUN npm run build

# ============================================================
# Stage 2: Serve with Nginx
# ============================================================
FROM nginx:alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config as a TEMPLATE (not to templates/ dir)
COPY nginx.conf /etc/nginx/nginx-template.conf

# Copy built Angular app from build stage
# Angular 20 outputs to dist/<project-name>/browser/
COPY --from=build /app/dist/quick-reserve/browser /usr/share/nginx/html

# Default API URL (override at runtime with -e API_URL=...)
ENV API_URL=http://host.docker.internal:5000

EXPOSE 80

# Use a custom entrypoint that:
# 1. Runs envsubst ONLY on $API_URL (preserving nginx variables)
# 2. Starts nginx
CMD ["/bin/sh", "-c", "envsubst '${API_URL}' < /etc/nginx/nginx-template.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

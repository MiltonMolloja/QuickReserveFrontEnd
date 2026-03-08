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

# Copy custom nginx config (template for envsubst)
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built Angular app from build stage
# Angular 20 outputs to dist/<project-name>/browser/
COPY --from=build /app/dist/quick-reserve/browser /usr/share/nginx/html

# Default API URL (override at runtime with -e API_URL=...)
ENV API_URL=http://host.docker.internal:5000

EXPOSE 80

# Nginx's docker-entrypoint automatically runs envsubst on
# /etc/nginx/templates/*.template → /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]

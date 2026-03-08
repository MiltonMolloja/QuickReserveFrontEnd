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

# Copy custom nginx config as a template
COPY nginx.conf /etc/nginx/nginx-template.conf

# Copy custom entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy built Angular app from build stage
# Angular 20 outputs to dist/<project-name>/browser/
COPY --from=build /app/dist/quick-reserve/browser /usr/share/nginx/html

# Default API URL (override at runtime with -e API_URL=...)
ENV API_URL=http://host.docker.internal:5000

EXPOSE 80

# Override the default nginx entrypoint with our custom one
# that runs envsubst only on $API_URL, then starts nginx
ENTRYPOINT ["/docker-entrypoint.sh"]

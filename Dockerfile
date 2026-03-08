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

# Remove default nginx config and add our own
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app from build stage
# Angular 20 outputs to dist/<project-name>/browser/
COPY --from=build /app/dist/quick-reserve/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

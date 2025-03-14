# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install pnpm (as the project uses pnpm for dependency management)
RUN npm install -g pnpm

COPY . .

# Install dependencies
RUN pnpm install

RUN pnpm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx configuration
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
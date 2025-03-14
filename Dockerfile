# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install pnpm (as the project uses pnpm for dependency management)
RUN npm install -g pnpm

COPY . .

# Install dependencies
RUN pnpm install

CMD ["pnpm", "run", "start"]
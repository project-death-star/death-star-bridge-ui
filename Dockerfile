# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Stage 2: Create the final production image
FROM node:18-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Set the user to non-root for better security
# The node user is created by the base image
USER node

# Expose the port the application will run on
EXPOSE 3000

# Set the command to start the server
CMD ["npm", "start"]

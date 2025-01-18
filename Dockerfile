# Use a lightweight Node.js image for the builder stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package manager files first to leverage caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm via corepack (pre-installed in Node.js 16.9+)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm build

# Create a minimal production image
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Debug build arguments
RUN echo "NEXT_PUBLIC_DOMAIN_BACKEND=${NEXT_PUBLIC_DOMAIN_BACKEND}" && \
    echo "NEXT_PUBLIC_PROJECT_ID=${NEXT_PUBLIC_PROJECT_ID}" && \
    echo "API_KEY=${API_KEY}"

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install only production dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install --prod

# Expose the port the app will run on
EXPOSE 3000

# Define build arguments for environment variables
ARG NEXT_PUBLIC_DOMAIN_BACKEND
ARG NEXT_PUBLIC_PROJECT_ID
ARG API_KEY

# Set environment variables for the container
ENV NEXT_PUBLIC_DOMAIN_BACKEND=${NEXT_PUBLIC_DOMAIN_BACKEND}
ENV NEXT_PUBLIC_PROJECT_ID=${NEXT_PUBLIC_PROJECT_ID}
ENV API_KEY=${API_KEY}

# Set the environment to production
ENV NODE_ENV=production

# Start the Next.js application
CMD ["pnpm", "start"]
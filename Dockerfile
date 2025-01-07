# Use a lightweight Node.js image
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

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install only production dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install --prod

# Expose the port the app will run on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the Next.js application
CMD ["pnpm", "start"]

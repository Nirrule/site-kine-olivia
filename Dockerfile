FROM node:20-alpine AS base

# Install dependencies only when needed
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Don't run production as root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy Next.js build output and necessary files
COPY --from=base --chown=nextjs:nodejs /app/.next ./.next
COPY --from=base --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=base --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=base --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

EXPOSE 3000

CMD ["pnpm", "start"]
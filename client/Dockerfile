# --- Stage 1: ビルドステージ ---
    FROM node:18-alpine AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build
    
    # --- Stage 2: 本番用ステージ ---
    FROM node:18-alpine
    WORKDIR /app
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/package.json ./
    RUN npm install --only=production
    EXPOSE 3000
    CMD ["npm", "start"]
    
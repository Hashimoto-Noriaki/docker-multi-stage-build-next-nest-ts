# --- Stage 1: ビルドステージ ---
    FROM node:16 AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build
    
    # --- Stage 2: 本番用ステージ ---
    FROM node:16-alpine
    WORKDIR /app
    # ビルド済みの成果物だけをコピー
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/package.json ./
    RUN npm install --only=production
    EXPOSE 3001
    CMD ["node", "dist/main.js"]
    
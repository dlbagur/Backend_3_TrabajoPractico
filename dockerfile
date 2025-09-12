# ====== Etapa de dependencias (instala node_modules) ======
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ====== Etapa de ejecución ======
FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app

# Copio dependencias y código
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Puerto de la app
EXPOSE 8080

# Variables por defecto (se pueden modificar en docker run)
ENV PORT=8080

# Arranque del servidor
CMD ["node", "src/server.js"]

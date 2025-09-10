# ====== Etapa de dependencias ======
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ====== Etapa de runtime ======
FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app

# Copio node_modules de deps y el resto del código
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Puerto de la app
EXPOSE 8080

# Variables de entorno por defecto
ENV PORT=8080

# Comando de arranque
CMD ["node", "src/server.js"]


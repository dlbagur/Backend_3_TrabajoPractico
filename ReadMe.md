# Adopt-me API 🐾

Proyecto desarrollado en **Node.js + Express + MongoDB**, con:
- **Winston** para logging
- **Swagger** para documentación
- **Docker** para empaquetar y ejecutar la app fácilmente

---

## 🚀 Cómo iniciar el proyecto

### Requisitos
- Node.js v18+
- MongoDB en local o Atlas

### Instalación
```bash
npm install
```

### Correr en desarrollo
```bash
npm run dev
```

### Correr en producción
```bash
NODE_ENV=production npm start
```

---

## 📚 Documentación de la API
Swagger UI disponible en:

```
http://localhost:8080/api-docs
```

---

## 🧾 Logging
- **Desarrollo**: logs en consola desde nivel `debug`.
- **Producción**: logs en consola desde nivel `info`, y además en archivo `errors.log` para `error` y `fatal`.

Probar con:
```
GET http://localhost:8080/api/diag/loggerTest
```

---

## 🧪 Tests
Los tests funcionales (Mocha + Supertest) cubren el router de **Adoptions**.

Ejecutar:
```bash
npm test
```

---

## 🐳 Docker
Este proyecto incluye un `Dockerfile` para crear una imagen.

### Construir imagen
```bash
docker build -t tuusuario/adoptme:1.0.0 .
```

### Ejecutar contenedor
```bash
docker run -p 8080:8080 \
  -e NODE_ENV=production \
  -e MONGO_URL="mongodb://host.docker.internal:27017/adoptme" \
  tuusuario/adoptme:1.0.0
```

---

## 📦 Imagen en Docker Hub
La imagen está disponible en:

👉 [Docker Hub - tuusuario/adoptme](https://hub.docker.com/r/tuusuario/adoptme)

---

## 📂 Estructura del proyecto

```
src/
 ├─ app.js
 ├─ server.js
 ├─ routes/
 ├─ controllers/
 ├─ dao/
 ├─ repository/
 ├─ services/
 ├─ utils/
 └─ middlewares/
```

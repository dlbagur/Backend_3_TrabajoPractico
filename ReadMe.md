# Adopt-me API
API de adopciones (**Users, Pets, Adoptions**) con **Express + Mongoose + Swagger + Winston**.  
Incluye **mocks** para generar datos y **tests funcionales** para el router de Adoptions.

---

## Características
- REST API con **Express**
- **Mongoose** (MongoDB)
- Documentación con **Swagger** en `/api-docs`
- Logger **Winston**  
  - Dev: nivel `debug` en consola  
  - Prod: nivel `info` en consola y `error`+ en `errors.log`
- **Mocks**: generación masiva de Users y Pets
- **Tests funcionales** con **Mocha + Supertest** para `adoption.router.js`
- Dockerfile + docker-compose (Mongo + App)

---

## Arranque local (sin Docker)
```bash
npm install
npm run dev
# Swagger en http://localhost:8080/api-docs
```

Por defecto:
- `PORT=8080`
- `MONGO_URL=mongodb://localhost:27017/adoptme`

---

## Docker

### Opción A — docker-compose (App + Mongo)
```bash
docker compose up --build
```
- App: `http://localhost:8080`  
- Swagger: `http://localhost:8080/api-docs`

**Comandos útiles:**
- Parar: `Ctrl+C`  
- Bajar contenedores: `docker compose down`  
- Borrar datos de Mongo: `docker compose down -v`  
- Logs app: `docker compose logs -f app`

### Opción B — Solo la app (Mongo local o Atlas)

**Build:**
```bash
docker build -t dlbagur/adoptme:1.0.0 .
```

**Run (Mongo local):**
```bash
docker run -p 8080:8080 `
  -e NODE_ENV=production `
  -e MONGO_URL="mongodb://host.docker.internal:27017/adoptme" `
  --name adoptme-public dlbagur/adoptme:1.0.0
```

**Run (Mongo Atlas):**
```bash
docker run -p 8080:8080 `
  -e NODE_ENV=production `
  -e MONGO_URL="mongodb+srv://USER:PASS@CLUSTER/DB?retryWrites=true&w=majority" `
  --name adoptme-public dlbagur/adoptme:1.0.0
```

### Imagen en Docker Hub
- [dlbagur/adoptme](https://hub.docker.com/r/dlbagur/adoptme)  
- Pull:
  ```bash
  docker pull dlbagur/adoptme:1.0.0
  ```

---

## Swagger
- UI: `GET /api-docs`  
- JSON: `GET /api-docs.json`

Rutas principales:
- **Users** → `/api/users`
- **Pets** → `/api/pets`
- **Adoptions** → `/api/adoptions`
- **Mocks** → `/api/mocks`

---

## Tests (Mocha + Supertest)
```bash
npm test
```
- Usa `NODE_ENV=test` y `MONGO_URL_TEST` (`mongodb://localhost:27017/adoptme_test`)
- Cubre todos los endpoints de `adoption.router.js`
- Limpia la DB de tests al terminar

---

## Troubleshooting
- `ERR_CONNECTION_REFUSED` → verificar puerto mapeado en `docker-compose.yml`
- `MongoParseError` → `MONGO_URL` debe empezar con `mongodb://` o `mongodb+srv://`
- No se ven cambios en Docker → `docker compose up --build`
- Resetear datos de Mongo → `docker compose down -v`

---

## Licencia
MIT

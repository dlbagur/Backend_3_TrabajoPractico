// tests/adoptions.test.js
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import app, { connectDB } from '../src/app.js';

// DB de pruebas (se puede sobreescribir con MONGO_URL_TEST)
const MONGO_TEST = process.env.MONGO_URL_TEST || 'mongodb://localhost:27017/adoptme_test';

describe('Adoptions router (functional)', function () {
  this.timeout(20000);

  let userId;
  let petId;
  let adoptionId;

  before(async () => {
    // ÚNICA conexión en test (app.js no se conecta cuando NODE_ENV==='test')
    await connectDB(MONGO_TEST);

    // Limpiar colecciones relevantes para empezar limpio
    const db = mongoose.connection.db;
    await Promise.all([
      db.collection('users').deleteMany({}).catch(() => {}),
      db.collection('pets').deleteMany({}).catch(() => {}),
      db.collection('adoptions').deleteMany?.({}).catch(() => {}),
    ]);
  });

  after(async () => {
    // Dejo la base de tests limpia y cierro conexión
    const db = mongoose.connection.db;
    if (db) await db.dropDatabase().catch(() => {});
    await mongoose.disconnect();
  });

  it('POST /api/users → crea usuario base', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        first_name: 'Diego',
        last_name: 'Bagur',
        email: `diego.${Date.now()}@example.com`,
        password: 'secret'
      });

    expect([200, 201]).to.include(res.status);
    // Tolera {status,payload} o documento directo
    userId = res.body?.payload?._id || res.body?._id;
    expect(userId).to.be.a('string');
  });

  it('POST /api/pets → crea pet base', async () => {
    const res = await request(app)
      .post('/api/pets')
      .send({
        name: 'Mishi',
        specie: 'cat',
        birthDate: '2020-01-01'
      });

    expect([200, 201]).to.include(res.status);
    petId = res.body?.payload?._id || res.body?._id;
    expect(petId).to.be.a('string');
  });

  it('POST /api/adoptions/:uid/:pid → crea adopción (ok)', async () => {
    // 1) Creamos la adopción
    const res = await request(app)
      .post(`/api/adoptions/${userId}/${petId}`)
      .send();

    expect([200, 201]).to.include(res.status);

    // 2) Intentamos tomar el _id de la respuesta si viene
    adoptionId = res.body?.payload?._id || res.body?._id;

    // 3) Si no vino el _id, lo resolvemos consultando el listado
    if (!adoptionId) {
      const listRes = await request(app).get('/api/adoptions');
      expect(listRes.status).to.equal(200);

      const payload = Array.isArray(listRes.body) ? listRes.body : listRes.body.payload;
      expect(payload).to.be.an('array');
      expect(payload.length).to.be.greaterThan(0);

      // Intento A: buscar por user/pet si tu API los incluye en el listado
      let found = payload.find(a =>
        (a.user?._id === userId || a.user === userId) &&
        (a.pet?._id === petId || a.pet === petId)
      );

      // Intento B: si no hay referencias en el listado, tomo la última
      if (!found) found = payload[payload.length - 1];

      adoptionId = found?._id;
    }

    expect(adoptionId, 'No se pudo resolver el _id de la adopción creada').to.be.a('string');
  });

  it('POST /api/adoptions/:uid/:pid → error si user/pet no existen', async () => {
    const fakeId = '66b9f3d2c8c9a81234567890'; // ObjectId con formato válido pero inexistente
    const res = await request(app)
      .post(`/api/adoptions/${fakeId}/${fakeId}`)
      .send();

    expect([400, 404]).to.include(res.status);
  });

  it('GET /api/adoptions → lista adopciones', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.status).to.equal(200);
    const payload = Array.isArray(res.body) ? res.body : res.body.payload;
    expect(payload).to.be.an('array');
    expect(payload.length).to.be.greaterThan(0);
  });

  it('GET /api/adoptions/:aid → obtiene por id (ok)', async () => {
    expect(adoptionId, 'adoptionId no seteado; revisar test de creación').to.be.a('string');

    const res = await request(app).get(`/api/adoptions/${adoptionId}`);
    expect(res.status).to.equal(200);
    const doc = res.body?.payload || res.body;
    expect(doc).to.be.an('object');
    expect(doc._id).to.be.a('string');
  });

  it('GET /api/adoptions/:aid → 404/400 si no existe', async () => {
    const fakeId = '66b9f3d2c8c9a81234567890';
    const res = await request(app).get(`/api/adoptions/${fakeId}`);
    expect([404, 400]).to.include(res.status);
  });
});

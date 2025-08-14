import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { generateUsers } from '../dao/mocks/userMocker.js';
import UserModel from '../dao/models/User.js';
import PetModel  from '../dao/models/Pet.js';

const router = Router();

/**
 * Genera 50 usuarios (NO inserta en DB)
**/
router.get('/mockingusers', async (req, res) => {
  try {
    const users = await generateUsers(50);
    res.json({ status: 'success', payload: users });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

/**
 * GET /api/mocks/mockingpets
 * Genera 100 mascotas (NO inserta en DB)
**/
router.get('/mockingpets', (req, res) => {
  try {
    const pets = Array.from({ length: 100 }).map(() => ({
      name: faker.animal.dog(),
      specie: faker.animal.type(),
      age: faker.number.int({ min: 1, max: 20 }),
    }));
    res.json({ status: 'success', pets });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

/**
 * POST /api/mocks/generateData
 * Body: { "users": <n>, "pets": <m> }
 * Genera e INSERTA en DB la cantidad pedida
**/
router.post('/generateData', async (req, res) => {
  try {
    const usersCount = Number(req.body?.users ?? 0);
    const petsCount  = Number(req.body?.pets  ?? 0);

    if (Number.isNaN(usersCount) || Number.isNaN(petsCount) || usersCount < 0 || petsCount < 0) {
      return res.status(400).json({ status: 'error', error: 'Parámetros inválidos' });
    }

    // Usuarios
    let insertedUsers = [];
    if (usersCount > 0) {
      const users = await generateUsers(usersCount);
      insertedUsers = await UserModel.insertMany(users);
    }

    // Pets
    let insertedPets = [];
    if (petsCount > 0) {
      const pets = Array.from({ length: petsCount }).map(() => ({
        name: faker.animal.cat(),
        specie: faker.animal.type(),
        age: faker.number.int({ min: 1, max: 15 }),
      }));
      insertedPets = await PetModel.insertMany(pets);
    }

    res.json({
      status: 'success',
      insertedUsers: insertedUsers.length,
      insertedPets: insertedPets.length
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

export default router;

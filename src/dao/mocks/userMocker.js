import { faker } from '@faker-js/faker';
import { hashPassword } from '../../utils/bcrypt.js';

export async function generateUsers(count = 50) {
  const hashed = await hashPassword('coder123');

  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashed,
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: []
    });
  }
  return users;
}

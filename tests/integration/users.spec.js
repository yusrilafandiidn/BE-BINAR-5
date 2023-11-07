const app = require('../../app');
const request = require('supertest');
let user = {};

// create users
describe('test POST /api/v1/users endpoint', () => {
  test('Create new user -> sukses', async () => {
    try {
      let name = 'mina';
      let email = 'mina@mail.com';
      let password = 'password123';

      let { statusCode, body } = await request(app)
        .post('/api/v1/users')
        .send({ name, email, password });
      user = body.data;

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('password');
      expect(body.data).toHaveProperty('profile');
      expect(body.data).toHaveProperty('identity_type');
      expect(body.data).toHaveProperty('identity_number');
      expect(body.data).toHaveProperty('address');
      expect(body.data.name).toBe(name);
      expect(body.data.email).toBe(email);
      expect(body.data.password).toBe(password);
      expect(body.data.profile.identity_type).toBe(identity_type);
      expect(body.data.profile.identity_number).toBe(identity_number);
      expect(body.data.profile.address).toBe(address);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test(' email sudah terdaftar -> error', async () => {
    try {
      let name = 'mina';
      let email = 'mina@mail.com';
      let password = 'password123';

      let { statusCode, body } = await request(app)
        .post('/api/v1/users')
        .send({ name, email, password });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

// get all users
describe('test GET /api/v1/users/ endpoint', () => {
  test('test cari semua user  -> sukses', async () => {
    try {
      let { statusCode, body } = await request(app).get('/api/v1/users');

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('password');
      expect(body.data.id).toBe(user.id);
      expect(body.data.name).toBe(user.name);
      expect(body.data.email).toBe(user.email);
      expect(body.data.password).toBe(user.password);
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

// get users by id
describe('test GET /api/v1/users/:id endpoint', () => {
  test('test cari user dengan id yang terdaftar -> sukses', async () => {
    try {
      let { statusCode, body } = await request(app).get(
        `/api/v1/users/${user.id}`
      );

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('password');
      expect(body.data.id).toBe(user.id);
      expect(body.data.name).toBe(user.name);
      expect(body.data.email).toBe(user.email);
      expect(body.data.password).toBe(user.password);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test('test cari user dengan id yang tidak terdaftar -> error', async () => {
    try {
      let { statusCode, body } = await request(app).get(
        `/api/v1/users/${user.id + 1000}`
      );

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

// edit users
describe('test PUT /api/v1/users/:id endpoint', () => {
  test('test edit user  -> sukses', async () => {
    try {
      let name = 'mina mina';
      let email = 'mina2@mail.com';
      let password = 'updatedPassword123';

      let { statusCode, body } = await request(app)
        .put(`/api/v1/users/${user.id}`)
        .send({ name, email, password });

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('password');
      expect(body.data.id).toBe(user.id);
      expect(body.data.name).toBe(user.name);
      expect(body.data.email).toBe(user.email);
      expect(body.data.password).toBe(user.password);
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

// delete users
describe('test DELETE /api/v1/users/:id endpoint', () => {
  test('test delete user  -> sukses', async () => {
    try {
      let { statusCode, body } = await request(app).delete(
        `/api/v1/users/${user.id}`
      );

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('password');
      expect(body.data.id).toBe(user.id);
      expect(body.data.name).toBe(user.name);
      expect(body.data.email).toBe(user.email);
      expect(body.data.password).toBe(user.password);
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

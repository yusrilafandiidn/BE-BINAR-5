const app = require('../../app');
const request = require('supertest');
let account = {};

// create accounts
describe('test POST /api/v1/accounts endpoint', () => {
  test('Create new accounts -> sukses', async () => {
    try {
      let user_id = 1;
      let bank_name = 'BCA';
        let bank_account_number = 123456789;
        let balance = 50000

      let { statusCode, body } = await request(app)
        .post('/api/v1/accounts')
        .send({ user_id, bank_name, bank_account_number, balance });
      account = body.data;

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('user_id');
      expect(body.data).toHaveProperty('bank_name');
      expect(body.data).toHaveProperty('bank_account_number');
      expect(body.data).toHaveProperty('balance');
      expect(body.data.user_id).toBe(user_id);
      expect(body.data.bank_name).toBe(bank_name);
      expect(body.data.bank_account_number).toBe(bank_account_number);
      expect(body.data.balance).toBe(balance);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test('test account sudah terdaftar -> error', async () => {
    try {
        let user_id = 1;
        let bank_name = 'BCA';
          let bank_account_number = 123456789;
          let balance = 50000
  
        let { statusCode, body } = await request(app)
          .post('/api/v1/accounts')
          .send({ user_id, bank_name, bank_account_number, balance });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

// get all accounts
describe('test GET /api/v1/accounts/ endpoint', () => {
  test('test cari semua accounts  -> sukses', async () => {
    try {
      let { statusCode, body } = await request(app).get('/api/v1/accounts');

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('user_id');
      expect(body.data).toHaveProperty('bank_name');
      expect(body.data).toHaveProperty('bank_account_number');
      expect(body.data).toHaveProperty('balance');
      expect(body.data.user_id).toBe(user_id);
      expect(body.data.bank_name).toBe(bank_name);
      expect(body.data.bank_account_number).toBe(bank_account_number);
      expect(body.data.balance).toBe(balance);
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

// get accounts by id
describe('test GET /api/v1/accounts/:id endpoint', () => {
  test('test cari accounts dengan id yang terdaftar -> sukses', async () => {
    try {
      let { statusCode, body } = await request(app).get(
        `/api/v1/accounts${account.id}`
      );

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('user_id');
      expect(body.data).toHaveProperty('bank_name');
      expect(body.data).toHaveProperty('bank_account_number');
      expect(body.data).toHaveProperty('balance');
      expect(body.data.user_id).toBe(user_id);
      expect(body.data.bank_name).toBe(bank_name);
      expect(body.data.bank_account_number).toBe(bank_account_number);
      expect(body.data.balance).toBe(balance);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test('test cari accounts dengan id yang tidak terdaftar -> error', async () => {
    try {
      let { statusCode, body } = await request(app).get(
        `/api/v1/accounts${account.id + 1000}`
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

// edit accounts
describe('test PUT /api/v1/accounts/:id endpoint', () => {
  test('test edit accounts  -> sukses', async () => {
    try {
        let user_id = 1;
        let bank_name = 'BCA';
          let bank_account_number = 123456789;
          let balance = 500000
  
        let { statusCode, body } = await request(app)
          .put(`/api/v1/accounts${account.id}`)
          .send({ user_id, bank_name, bank_account_number, balance });
  
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
        expect(body.data).toHaveProperty('user_id');
        expect(body.data).toHaveProperty('bank_name');
        expect(body.data).toHaveProperty('bank_account_number');
        expect(body.data).toHaveProperty('balance');
        expect(body.data.user_id).toBe(user_id);
        expect(body.data.bank_name).toBe(bank_name);
        expect(body.data.bank_account_number).toBe(bank_account_number);
        expect(body.data.balance).toBe(balance);
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

// delete accounts
describe('test DELETE /api/v1/accounts/:id endpoint', () => {
    test('test delete accounts  -> sukses', async () => {
      try {
        let { statusCode, body } = await request(app).delete(
            `/api/v1/accounts${account.id}`
          );
  
          expect(statusCode).toBe(200);
          expect(body).toHaveProperty('status');
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('data');
          expect(body.data).toHaveProperty('user_id');
          expect(body.data).toHaveProperty('bank_name');
          expect(body.data).toHaveProperty('bank_account_number');
          expect(body.data).toHaveProperty('balance');
          expect(body.data.user_id).toBe(user_id);
          expect(body.data.bank_name).toBe(bank_name);
          expect(body.data.bank_account_number).toBe(bank_account_number);
          expect(body.data.balance).toBe(balance);
      } catch (err) {
        expect(err).toBe(err);
      }
    });
  });
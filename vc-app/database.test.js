const db = require('./database');

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

test('create user', async () => {
  expect.assertions(1);
  const user = await db.User.create({
    username: 'angus',
    email: 'angus@thepavilion.io',
    otp: 1234
  });
  expect(user.email).toEqual('angus@thepavilion.io');
});

test('get user', async () => {
  expect.assertions(2);
  const user = await db.User.findOne({ where: { username: 'angus' } });
  expect(user.username).toEqual('angus');
  expect(user.otp).toEqual("1234");
});

test('delete user', async () => {
  expect.assertions(1);
  await db.User.destroy({ where: { email: 'angus@thepavilion.io' }});
  const user = await db.User.findOne({ where: { username: 'angus' } });
  expect(user).toBeNull();
});

afterAll(async () => {
  await db.sequelize.close();
});
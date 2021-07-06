const db = require('./database');

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

test('create user', async () => {
  expect.assertions(1);
  const user = await db.User.create({
    id: 1,
    username: 'angus',
    otp: 1234
  });
  expect(user.id).toEqual(1);
});

test('get user', async () => {
  expect.assertions(2);
  const user = await db.User.findByPk(1);
  expect(user.username).toEqual('angus');
  expect(user.otp).toEqual(1234);
});

test('delete user', async () => {
  expect.assertions(1);
  await db.User.destroy({
    where: {
      id: 1
    }
  });
  const user = await db.User.findByPk(1);
  expect(person).toBeNull();
});

afterAll(async () => {
  await db.sequelize.close();
});
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_SCHEMA || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL == "true"
    }
  }
);

const User = sequelize.define('user', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  otp: {
    type: Sequelize.BIGINT,
    allowNull: true
  },
  issued: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
});

module.exports = {
  sequelize: sequelize,
  User: User
};
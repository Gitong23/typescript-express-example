
// sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'express',
  define: {
    timestamps: true, // Disable automatic timestamps for each model
  },
});

export default sequelize;

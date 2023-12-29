// User.ts

import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../db/db.sequelize'; // Update the path accordingly
import bcrypt from 'bcrypt';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>
  username: string
  email: string
  password: string
}

const User = sequelize.define<UserModel>('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
  ,{
    hooks: {
      beforeCreate: async (user: UserModel) => {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
      },
    }
  }
);

export default User

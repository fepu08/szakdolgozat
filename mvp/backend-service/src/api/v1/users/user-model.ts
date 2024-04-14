import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/sequelize-config';
import bcrypt from 'bcrypt';

export interface UserAttributes {
  user_id: number;
  email: string;
  password: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare user_id: number;
  declare email: string;
  declare password: string;
  declare name?: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static async hashPassword(user: User) {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }

  async checkPassword(inputPw: string): Promise<boolean> {
    return await bcrypt.compare(inputPw, this.password);
  }
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    defaultScope: {
      attributes: {
        include: ['createdAt', 'updatedAt'],
        exclude: ['password'],
      },
    },
    scopes: {
      withPassword: { attributes: { include: ['password'] } },
    },
    hooks: {
      beforeCreate: async (user: User) => {
        await User.hashPassword(user);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          await User.hashPassword(user);
        }
      },
    },
  },
);

export { User as UserModel };

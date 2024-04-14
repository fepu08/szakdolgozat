import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/sequelize-config';

export interface MovieAttributes {
  movie_id: number;
  title: string;
  releaseYear: number;
  createdAt?: Date;
  updatedAt?: Date;
}
interface MovieCreationAttributes
  extends Optional<MovieAttributes, 'movie_id'> {}

class Movie
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes
{
  declare movie_id: number;
  declare title: string;
  declare releaseYear: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Movie.init(
  {
    movie_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Movie',
    tableName: 'movies',
    timestamps: true,
    underscored: true,
    defaultScope: {
      attributes: {
        include: ['createdAt', 'updatedAt'],
      },
    },
  },
);

export { Movie as MovieModel };

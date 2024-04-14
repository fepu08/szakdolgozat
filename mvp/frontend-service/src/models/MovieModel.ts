export type MovieItem = {
  title: string;
  releaseYear: string;
};

export type MovieDTO = {
  id?: number;
  title: string;
  releaseYear: string;
  createdAt?: string;
  updatedAt?: string;
};

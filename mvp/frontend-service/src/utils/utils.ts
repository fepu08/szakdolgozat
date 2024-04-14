import { MovieItem } from '../models/MovieModel';

export function clearStorage() {
  localStorage.removeItem('recommendations');
  localStorage.removeItem('userInfo');
}

export function getMockMovies(num = 12): MovieItem[] {
  const movies: MovieItem[] = [];

  for (let i = 1; i <= num; i++) {
    movies.push({ title: `Movie ${i}`, releaseYear: `200${i}` });
  }

  return movies;
}

export function reformatTitle(title: string): string {
  const regex = /^(.*),\s*(.The)$/;
  const match = title.match(regex);

  if (match) {
    return `${match[2]} ${match[1]}`;
  }

  return title;
}

export function trimTitle(title: string, maxLength: number): string {
  return title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;
}

export function getNiceTitle(title: string, maxLength = 25): string {
  return trimTitle(reformatTitle(title), maxLength);
}

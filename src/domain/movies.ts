import { removeMoreButton, renderMovieList } from "../components/movie-list/movieListHandler";
import { findGenreNameById } from "./genres";
import { Movie } from "../type";
import { fetchMovies } from "./movieApi";
import Store from "./Store";

interface MovieApiResponseResult {
  id: string;
  genre_ids: number[];
  poster_path: string;
  overview: string;
  title: string;
  vote_average: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.API_KEY;
const store: Store = Store.getInstance();

export const searchMovieByKeyword = (keyword: string) => {

  if (keyword === "") return;

  store.resetMoviesAndPages();
  store.setLastKeyword(keyword);

  updateMovies(keyword);
}

export const updateMovies = async (keyword?: string) => {
  const url = urlBuilder(keyword);
  const { results, total_pages } = await fetchMovies(url);
  store.setTotalPage(total_pages);
  store.appendMovies(convertApiResponseToMovieList(results));
  renderMovieList();
  dispatchMovieEvents();

  if (store.getPage() === store.getTotalPage()) removeMoreButton();
}

const dispatchMovieEvents = () => {
  store.getMovies().forEach((movie) => {
    const movieItemEvent = new CustomEvent('movieItemEvent', { detail: movie });
    const movieItem = document.getElementById(`moive-${movie.id}`);
    if (movieItem instanceof HTMLElement) {
      movieItem.dispatchEvent(movieItemEvent);
    }
  });
}

const urlBuilder = (keyword?: string) => {
  return keyword ? (
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&page=${store.getPage()}&query=${keyword}`
  ) : (
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=${store.getPage()}`
  );
}

const convertApiResponseToMovieList = (results: MovieApiResponseResult[]): Movie[] => {
  return results.map((movie) => {
    return {
      id: movie.id,
      genres: convertGenreIdsToGenres(movie.genre_ids),
      overview: movie.overview,
      poster: movie.poster_path,
      title: movie.title,
      ratings: movie.vote_average,
    };
  });
};

const convertGenreIdsToGenres = (numbers: number[]): string[] => {
  return numbers.map((number) => findGenreNameById(number));
}

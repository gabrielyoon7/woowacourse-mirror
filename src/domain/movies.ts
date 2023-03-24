import { removeMoreButton, renderMovieList, renderSkeletons } from "../components/MovieList/movieListHandler";
import { Movie } from "../type";
import { $ } from "../utils/selector";
import { fetchMovies } from "./movieApi";
import Store from "./Store";

interface MovieResult {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.API_KEY;
const store: Store = Store.getInstance();

export const checkIntersectionObserverEntries = (intersectionObserverEntries: IntersectionObserverEntry[]) => {
  const isElementVisible = intersectionObserverEntries[0].isIntersecting; // 옵저빙을 하나만 했으므로 굳이 배열을 돌리지 않습니다.
  if (isElementVisible) {
    loadNextPage();
  }
}

const loadNextPage = () => {
  $(".item-list").insertAdjacentHTML("beforeend", renderSkeletons());
  store.nextPage();

  if (store.getLastKeyword() === "") {
    updateMovies();
  } else {
    updateMovies(store.getLastKeyword());
  }
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
    const customEvent = new CustomEvent('movieItemEvent', { detail: movie });
    const customElement = document.getElementById(`moive-${movie.id}`);
    if (customElement instanceof HTMLElement) {
      customElement.dispatchEvent(customEvent);
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

const convertApiResponseToMovieList = (results: MovieResult[]): Movie[] => {
  return results.map((movie) => {
    return {
      id: movie.id,
      poster: movie.poster_path,
      title: movie.title,
      ratings: movie.vote_average,
    };
  });
};
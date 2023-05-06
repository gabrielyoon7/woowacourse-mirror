import { Movie } from "../../type";
import MovieModal from "../movie-modal/MovieModal";

export default class MovieItem extends HTMLElement {

  private movie: Movie = {
    id: "",
    genres: [],
    overview: "",
    poster: "",
    title: "",
    ratings: 0
  };

  private handleMovieItemEvent = (event: CustomEventInit) => {
    this.movie = event.detail;
    this.render();
  };

  private handleMouseOver = () => {
    this.style.cursor = 'pointer';
  };

  private handleClick = () => {
    const movieModal = document.getElementById('movie-modal') as MovieModal;
    movieModal.open(this.movie);
  };

  connectedCallback() {
    this.addEventListener('movieItemEvent', this.handleMovieItemEvent);
    this.addEventListener('mouseover', this.handleMouseOver);
    this.addEventListener('click', this.handleClick);
  }

  render() {
    this.innerHTML = `
    <li>
        <div class="item-card">
          <img
            class="item-thumbnail skeleton"
            src="https://image.tmdb.org/t/p/w500/${this.movie.poster}"
            onerror="
              this.style.border='1px solid #e2e2e2';
              this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
            "
            loading="lazy"
            alt="${this.movie.title}"
          >
          <p class="item-title">${this.movie.title}</p>
          <p class="item-score">
            <img src="./assets/star_${this.movie.ratings > 0 ? "filled" : "empty"}.png" alt="별점" />
            ${this.movie.ratings.toFixed(1)}
          </p>
        </div>
    </li>
    `;
  }
}

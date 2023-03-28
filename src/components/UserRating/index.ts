const RATING_DESCRIPTION = ["평가하기", "최악이예요", "별로예요", "보통이에요", "재미있어요", "명작이에요"]
export default class UserRating extends HTMLElement {

  private movieId = "";
  private rating: number = 0;

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['movie-id'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const ratingBackUp = localStorage.getItem(newValue);
    this.movieId = newValue;
    this.rating = ratingBackUp ? Number(ratingBackUp) : 0;
    this.render();

  }

  saveRatings(movieId: string, rating: number) {
    localStorage.setItem(movieId, rating + "");
  }

  render() {
    this.innerHTML = `
    <div class="d-flex justify-content-center user-rating align-items-center p-3">
      <div>내 별점</div>
      <div class="mx-2">${this.starIcons(this.rating)}</div>
      <div id="rating-point">${this.rating * 2}</div>
      <div class="rating-description mx-1">${RATING_DESCRIPTION[this.rating]}</div>
    </div>
    `;

    this.onClickStar();
  }

  onClickStar() {
    this.querySelectorAll<HTMLImageElement>(".rating-star").forEach(starImg => {
      starImg.addEventListener("click", () => {
        this.rating = Number(starImg.dataset.rating);
        this.saveRatings(this.movieId, this.rating);
        this.render();
      });
    });
  }

  starIcons(rating: number) {
    return Array.from({ length: 5 }).map((_, i) => `
      <img 
        class="rating-star" 
        src="./assets/star_${i < rating ? "filled" : "empty"}.png" 
        alt="별점" 
        data-rating="${i + 1}"
      />`).join('');
  }

}

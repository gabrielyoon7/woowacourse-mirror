import { restaurants } from "../domain/restaurants";
import RestaurantList from "./RestaurantList";

class SortingSelectBox extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.onSelectOption();
  }

  render() {
    this.innerHTML = `
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          <option id="sortingOptionName" value="name">이름순</option>
          <option value="distance">거리순</option>
        </select>
      `;
  }

  onSelectOption() {
    const sortingFilter = document.getElementById("sorting-filter");
    if (sortingFilter instanceof HTMLSelectElement) {
      sortingFilter.addEventListener("change", () => {
        this.sortRestaurant(sortingFilter.value);
      });
    }
  }

  sortRestaurant(key: string) {
    restaurants.state.sort = key;
  }
}

export default SortingSelectBox;

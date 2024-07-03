import { CART_component } from "./cart.js";
import { LOCALSTORAGE_component } from "./localStorage.js";
import { PRODUCTS_component } from "./products.js";
class Categories {
  activeCategory = "Все";
  ROOT_element;
  activeClass;
  constructor(root, activeClass) {
    this.ROOT_element = root;
    this.activeClass = activeClass;
  }
  set activeCategory(category) {
    this.activeCategory = category;
  }

  renderCategories() {
    const activeCategoryFromLocalStor = LOCALSTORAGE_component.getItem(
      "activeCategoryYouMeal"
    );
    if (activeCategoryFromLocalStor.length !== 0) {
      this.activeCategory = activeCategoryFromLocalStor;
    }

    const container = document.createElement("div");
    container.className = "container";

    const categoryList = document.createElement("ul");
    categoryList.className = "scrollbar_main_title";
    categoryList.innerHTML = `
    <a href="#!" data-item-category="Все" class="scrollbar_main_title_item item1">Все товары</a>
    <a href="#!" data-item-category="burger" class="scrollbar_main_title_item item2">Бургеры</a>
    <a href="#!" data-item-category="hot-dog" class="scrollbar_main_title_item item4">Сосиски</a>
    <a href="#!" data-item-category="snack" class="scrollbar_main_title_item item3">Закуски</a>
    <a href="#!" data-item-category="shawarma" class="scrollbar_main_title_item item1">Шаверма</a>
    <a href="#!" data-item-category="combo" class="scrollbar_main_title_item item6">Комбо</a>
    <a href="#!" data-item-category="pizza" class="scrollbar_main_title_item item7">Пицца</a>
    <a href="#!" data-item-category="dessert" class="scrollbar_main_title_item item3">Десерт</a>
    <a href="#!" data-item-category="sauce" class="scrollbar_main_title_item item5">Соусы</a>
    `;
    container.append(categoryList);
    document.querySelector(this.ROOT_element).append(container);
    this.changeActiveClass(true);
    this.changeActiveCategory(categoryList);

    PRODUCTS_component.renderProducts(
      document.querySelector(`[data-item-category="${this.activeCategory}"]`)
        .textContent,
      this.activeCategory
    );
  }
  changeActiveClass(param) {
    if (param) {
      document.querySelectorAll(`[data-item-category]`).forEach((el) => {
        if (el.dataset.itemCategory === this.activeCategory) {
          el.classList.add(this.activeClass);
        }
      });
    } else {
      document.querySelectorAll(`[data-item-category]`).forEach((el) => {
        if (el.dataset.itemCategory === this.activeCategory) {
          el.classList.remove(this.activeClass);
        }
      });
    }
  }
  changeActiveCategory(HTMLElement) {
    HTMLElement.addEventListener("click", () => {
      if (!event.target.classList.contains("scrollbar_main_title_item")) {
        return;
      } else {
        if (CART_component.cartIsOpen) {
          CART_component.closeCart();
        }
        this.changeActiveClass(false);
        this.activeCategory = event.target.dataset.itemCategory;
        this.changeActiveClass(true);
        PRODUCTS_component.renderProducts(
          event.target.textContent,
          this.activeCategory
        );
        LOCALSTORAGE_component.setItem(
          "activeCategoryYouMeal",
          this.activeCategory
        );
      }
    });
    LOCALSTORAGE_component.setItem(
      "activeCategoryYouMeal",
      this.activeCategory
    );
  }
}

const CATEGORY_component = new Categories(".scrollbar_main", "active_item");
export { CATEGORY_component };

import { API_component } from "./api.js";
import { MODAL_component } from "./modal.js";
import { LOCALSTORAGE_component } from "./localStorage.js";
import { CART_component } from "./cart.js";

class Products {
  activeBtnClass;
  activeCardClass;
  activeBtnText;
  ROOT_element;
  constructor(root, activeBtnClass, activeCardClass, activeBtnText) {
    this.ROOT_element = root;
    this.activeBtnClass = activeBtnClass;
    this.activeCardClass = activeCardClass;
    this.activeBtnText = activeBtnText;
  }
  async renderProducts(category = "Все товары", filterCategory) {
    document.querySelector(this.ROOT_element).innerHTML = "";
    let DATA = await API_component.getGoods();

    if (filterCategory && filterCategory !== "Все") {
      DATA = DATA.filter((el) => el.category === filterCategory);
    }

    const goodsInCart = LOCALSTORAGE_component.getItem("cartYouMeal").map(
      (el) => el.id
    );

    const container = document.createElement("div");
    container.className = "container";
    const div = document.createElement("div");
    div.className = "cards_items_card";
    div.append(this.renderTitleOfProducts(category));

    const listOfProducts = document.createElement("div");
    listOfProducts.className = "cards_items__products";
    const products = DATA.map((item) => {
      const div = document.createElement("div");
      div.dataset.productId = item.id;

      div.className = `item__product ${
        goodsInCart.includes(item.id) ? this.activeCardClass : ""
      }`;

      div.innerHTML = `
        <img src="${item.image}" alt="${item.category}" />
                <p class="item__product1">${item.price}<span> ₽</span></p>
                <p class="product_name">${item.title}</p>
                <p class="product_detail">${item.weight}г</p>
                <button class='${
                  goodsInCart.includes(item.id) ? this.activeBtnClass : ""
                }'>${
        goodsInCart.includes(item.id) ? this.activeBtnText : "Добавить"
      }</button>
            `;
      return div;
    });

    listOfProducts.append(...products);
    div.append(listOfProducts);
    container.append(div);
    document.querySelector(this.ROOT_element).append(container);
    this.getSingleProduct(listOfProducts);
  }
  renderTitleOfProducts(title) {
    const div = document.createElement("div");
    div.className = "cards_items_title";
    div.innerHTML = `<h2>${title}</h2>`;
    return div;
  }
  getSingleProduct(HTMLelement) {
    let activeProduct = false;
    HTMLelement.addEventListener("click", () => {
      if (!event.target.closest(".item__product")) {
        return;
      } else {
        if (
          event.target
            .closest(".item__product")
            .classList.contains(this.activeCardClass)
        ) {
          activeProduct = true;
        } else {
          activeProduct = false;
        }
        MODAL_component.renderModalWindow(
          event.target.closest(".item__product").dataset.productId,
          activeProduct
        );
        CART_component.closeCart()
      }
    });
  }
  removeActiveInCartClass(productId){
    const root = document.querySelector(this.ROOT_element)
    const element = root.querySelector(`[data-product-id="${productId}"]`)
    if(element){
      element.querySelector('button').classList.remove('item__product__active__btn')
      element.classList.remove('item__product__active')
    }
  }
}

const PRODUCTS_component = new Products(
  ".cards_items",
  "item__product__active__btn",
  "item__product__active",
  "Добавлено в корзину"
);
export { PRODUCTS_component };

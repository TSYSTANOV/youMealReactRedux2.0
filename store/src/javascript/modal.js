import { API_component } from "./api.js";
import { CART_component } from "./cart.js";

class ModalWindow {
  ROOT_element;
  activeClassBtn;
  activeClassItem;

  constructor(root, activeClassBtn, activeClassItem) {
    this.ROOT_element = root;
    this.activeClassBtn = activeClassBtn;
    this.activeClassItem = activeClassItem;
  }
  async renderModalWindow(id, activeGood) {
    const DATA = await API_component.getGoods(id);

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal";

    const modalCard = document.createElement("div");
    modalCard.className = "modal__card";
    modalCard.dataset.productId = DATA.id;

    modalCard.innerHTML = `
    <div class="modal__card-title"><h2>${DATA.title}</h2></div>
        <div class="modal__card_information">
          <div class="modal_image">
            <img src="${DATA.image}" alt="${DATA.category}" />
          </div>
          <div class="modal__card-content">
            <p class="modal__card-content_first">
              ${DATA.description}
            </p>
            <span class="modal__card-content-inset">Состав:</span>
            <span class="modal__card-content-outset">${DATA.weight}г, ккал ${DATA.calories}</span>
          </div>
          <div class="modal__footer_info"></div>
        <button class="modal-close">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5.07422"
              y="5.28249"
              width="1"
              height="20"
              transform="rotate(-45 5.07422 5.28249)"
            />
            <rect
              x="5.78125"
              y="19.4246"
              width="1"
              height="20"
              transform="rotate(-135 5.78125 19.4246)"
            />
          </svg>
        </button>`;
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal__card-footer";
    modalFooter.innerHTML = `
    <div class="modal__card-footer">
    <button class="modal__card-footer_button">Добавить</button>
    </div>`;
    const { modalFooterSummary, changeSum } = this.changeSummartPriceModal(
      DATA.price
    );
    const elements = this.changeCountModal(changeSum);
    const { container, checkCount } = elements();
    modalFooter.querySelector(".modal__card-footer_button").after(container);

    const listOfIngrediens = document.createElement("ul");
    const list = DATA.ingredients.map((el) => {
      const li = document.createElement("li");
      li.textContent = el;
      return li;
    });
    listOfIngrediens.append(...list);

    modalCard
      .querySelector(".modal__card-content-inset")
      .after(listOfIngrediens);

    if (activeGood === false) {
      modalCard
        .querySelector(".modal__footer_info")
        .append(modalFooter, modalFooterSummary);
    }
    modalContainer.append(modalCard);
    document.querySelector(this.ROOT_element).append(modalContainer);
    this.closeModal(modalContainer);
    this.modalListenerAdd(modalContainer, DATA.id, checkCount, [
      modalFooterSummary,
      container,
    ],DATA.price);
  }
  closeModal(HTMLelement) {
    HTMLelement.addEventListener("click", () => {
      if (
        event.target === HTMLelement ||
        event.target.closest(".modal-close")
      ) {
        HTMLelement.remove();
      }
    });
  }
  changeSummartPriceModal(price) {
    const modalFooterSummary = document.createElement("div");
    modalFooterSummary.className = "modal__card-summary";
    const p = document.createElement("p");
    p.innerHTML = `${price}<span>₽</span>`;
    modalFooterSummary.append(p);

    function changeSum(count) {
      p.innerHTML = `<p>${price * count}<span>₽</span></p>`;
    }

    return { modalFooterSummary, changeSum };
  }
  changeCountModal(changeSumCallBack) {
    let count = 1;

    return () => {
      const container = document.createElement("div");
      container.className = "card_number";

      const btnMinus = document.createElement("button");
      btnMinus.className = "minus_number";
      btnMinus.textContent = "-";
      btnMinus.addEventListener("click", () => {
        if (count > 1) {
          count--;
          countNumber.textContent = count;
          changeSumCallBack(count);
        }
      });
      const btnPlus = document.createElement("button");
      btnPlus.className = "plus_number";
      btnPlus.textContent = "+";
      btnPlus.addEventListener("click", () => {
        count++;
        countNumber.textContent = count;
        changeSumCallBack(count);
      });
      const countNumber = document.createElement("p");
      countNumber.textContent = count;
      container.append(btnMinus, countNumber, btnPlus);
      function checkCount() {
        return count;
      }
      return { container, checkCount };
    };
  }
  changesAfterAddToCart(
    productToCart,
    changeTextBtn,
    elementToDelete,
    modalWindow
  ) {
    CART_component.addToCart = productToCart;
    changeTextBtn.textContent = "Добавлено в корзину";
    elementToDelete.forEach((el) => {
      el.remove();
    });
    setTimeout(() => {
      modalWindow.remove();
    }, 1000);
  }
  modalListenerAdd(HTMLelement, id, countCallback, elementToDelete, price) {
    HTMLelement.addEventListener("click", () => {

      if (!event.target.classList.contains("modal__card-footer_button")) {
        return;
      } else {
        document
          .querySelector(`[data-product-id="${id}"]`)
          .classList.add(this.activeClassItem);
        document
          .querySelector(`[data-product-id="${id}"]`)
          .querySelector("button")
          .classList.add(this.activeClassBtn);
        this.changesAfterAddToCart(
          { id, count: countCallback(), price},
          event.target,
          elementToDelete,
          HTMLelement
        );
      }
    });
  }
}

const MODAL_component = new ModalWindow(
  "body",
  "item__product__active__btn",
  "item__product__active"
);
export { MODAL_component };

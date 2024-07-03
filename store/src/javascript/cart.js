import { API_component } from "./api.js";
import { LOCALSTORAGE_component } from "./localStorage.js";
import { MODAL_CLIENT_component } from "./modalClient.js";
import { PRODUCTS_component } from "./products.js";

class Cart {
  ROOT_element;
  GOODSinCart = [];
  GoodsInCartCount = 0;
  CART_OPEN_element;
  CART_CLOSE_element;
  CartIsOpen = false;
  countClass;
  constructor(root) {
    this.ROOT_element = root;
  }
  renderCart() {
    this.changeCountInCart();
    this.GOODSinCart = LOCALSTORAGE_component.getItem("cartYouMeal");
    this.changeCountInCart();
    ///

    const cartOpen = document.createElement("div");
    cartOpen.className = "cart__open";

    ///
    const cartContainer = document.createElement("div");
    cartContainer.className = "cart_container";

    const btnCart = document.createElement("button");
    btnCart.className = "cart_container_title";
    btnCart.innerHTML = `
                <h2 class="cart_container_title_button">Корзина</h2>
                <span class="totalItems">${this.GoodsInCartCount}</span>`;
    this.countClass = ".totalItems";
    btnCart.addEventListener("click", () => {
      if (this.CartIsOpen) {
        this.closeCart();
        this.CartIsOpen = false;
      } else {
        this.openCart();
        this.CartIsOpen = true;
      }
    });

    cartContainer.append(btnCart,cartOpen);
    document.querySelector(this.ROOT_element).append(cartContainer);
    this.CART_OPEN_element = ".cart__open";
    this.visibleCount();
  }
  async openCart() {
    // const cartOpen = document.createElement("div");
    // cartOpen.className = "cart__open";

    const cartContent = document.createElement("div");
    cartContent.className = "cartGeneral__content";

    const cartList = document.createElement("div");
    cartList.className = "cart_container_content";

    const idOfGoods = this.GOODSinCart.map((el) => el.id);
    let listOfProducts = await API_component.getListOfGoods(
      idOfGoods.join(",")
    );
    const elements = listOfProducts
      .map((el) => {
        const goods = this.GOODSinCart.find((elem) => elem.id === el.id);
        el.count = goods ? goods.count : null
        return el.count ? el : null;
      })
      .map((item) => {
        if(item === null){
          return null
        }
        const container = document.createElement("div");
        container.className = "cart_container_content_card";
        container.dataset.productId = item.id
        container.innerHTML = `
      <img src="${item.image}" alt="${item.category}" />
      <div class="card_text">
        <h2>${item.title}</h2>
        <span>${item.weight}г</span>
        <p>${item.price}<span>₽</span></p>
      </div>
      <div class="card_number">
      <button class="minus_number">-</button>
         <p>${item.count}</p>
        <button class="plus_number">+</button>
   </div>`;

        return container;
      })

    if(elements[0] !== null){
    cartList.append(...elements);
    }
    else{
      cartList.append(this.emptyCartMessage())
    }

    const cartFooterBlock = document.createElement("div");
    cartFooterBlock.className = "cart_container__footer__block";
    const cartFooter = document.createElement("div");
    cartFooter.className = "cart_container_footer";
    cartFooter.innerHTML = `
          <p>Итого</p>
          `;
    const totalSum = this.sumTotalInCart(this.GOODSinCart)
    const pElem = document.createElement('p')
    pElem.innerHTML = `<p>${totalSum ? totalSum : 0} <span>₽</span></p>`

    cartFooter.append(pElem)

    const btnSendRequest = document.createElement("button");
    btnSendRequest.className = "cart_container_footer_button";
    btnSendRequest.textContent = "Оформить";

    const footerBlock = document.createElement("div");
    footerBlock.className = "cart_container_footer_info";
    footerBlock.innerHTML = `
        <p>Бесплатная доставка</p>
        `;
    const btnCloseCart = document.createElement("button");
    btnCloseCart.textContent = "Свернуть";
    btnCloseCart.addEventListener("click", () => {
      this.closeCart();
      this.CartIsOpen = false;
    });

    footerBlock.append(btnCloseCart);
    cartFooterBlock.append(cartFooter, btnSendRequest, footerBlock);
    cartContent.append(cartList, cartFooterBlock);
    // cartOpen.append(cartContent);

    // document.querySelector(this.CART_OPEN_element).append(cartOpen);
    document.querySelector(this.CART_OPEN_element).append(cartContent);

    // this.CART_CLOSE_element = ".cart__open";
    this.CART_CLOSE_element = '.cartGeneral__content'
    this.addListener(cartContent, cartFooterBlock);
    cartContent.style.maxHeight = cartContent.scrollHeight + 'px'
  }

  closeCart() {
    if(this.CartIsOpen){
    document.querySelector(this.CART_CLOSE_element).style.maxHeight = '0px'
    document.querySelector(this.CART_CLOSE_element).style.top = '-40px'

    setTimeout(()=>{
      document.querySelector(this.CART_CLOSE_element).remove();
    },1000)
    this.CartIsOpen = false;
    }
  }
  cartTonull(){
    this.GOODSinCart = []
    LOCALSTORAGE_component.setItem("cartYouMeal", this.GOODSinCart);
    this.closeCart()
    this.changeCountInCart()
    this.visibleCount()
  }
  changeCountInCart() {
    this.GoodsInCartCount = this.GOODSinCart.reduce((acc, el) => {
      acc += el.count;
      return acc;
    }, 0);
  }
  visibleCount() {
    const catalog = document.querySelector(this.ROOT_element);
    catalog.querySelector(this.countClass).textContent = this.GoodsInCartCount;
  }
  set addToCart(product) {
    this.GOODSinCart.push(product);
    this.changeCountInCart();
    this.visibleCount();
    LOCALSTORAGE_component.setItem("cartYouMeal", this.GOODSinCart);
  }
  get cartIsOpen() {
    return this.CartIsOpen;
  }
  sumTotalInCart(cart){
    const totalSum = cart.reduce((acc, el)=>{
      acc += el.price * el.count
      return acc
    },0)
    return totalSum ? totalSum : 0
  }
  visibleChangeSumTotalInCart(HTMLelement, sum){
    HTMLelement.querySelector('.cart_container_footer').innerHTML = `
    <p>Итого</p>
    <p>${sum} <span>₽</span></p>`
  }
  emptyCartMessage(){
    const p = document.createElement('p')
    p.className = 'empty-cart'
    p.textContent = 'Корзина пустая'
    return p
  }
  addListener(HTMLelement, footerCartElement) {

    HTMLelement.addEventListener("click", (event) => {
      if(event.target.classList.contains('cart_container_footer_button')){
        MODAL_CLIENT_component.GoodsToSendToServer = this.GOODSinCart
        MODAL_CLIENT_component.renderModal()
        return
      }
      if(event.target.classList.contains('minus_number') || event.target.classList.contains('plus_number')){
        let index = null
        this.GOODSinCart.forEach((el, i)=>{
        if(el.id === event.target.closest('.cart_container_content_card').dataset.productId)  {
          index = i
        }
        })

      let count = +event.target.parentNode.querySelector('p').textContent
      if(event.target.classList.contains('minus_number')){
        count--
        event.target.parentNode.querySelector('p').textContent = count
        if(count < 1){
          event.target.closest('.cart_container_content_card').remove()
          this.GOODSinCart.splice(index, 1)
          PRODUCTS_component.removeActiveInCartClass(event.target.closest('.cart_container_content_card').dataset.productId)
        }else{
          this.GOODSinCart[index].count = count
        }
        this.changeCountInCart()
        this.visibleCount()
      }
      if(event.target.classList.contains('plus_number')){
        count++
        event.target.parentNode.querySelector('p').textContent = count
        this.GOODSinCart[index].count = count
        this.changeCountInCart()
        this.visibleCount()
      }
      LOCALSTORAGE_component.setItem("cartYouMeal", this.GOODSinCart);
      this.visibleChangeSumTotalInCart(footerCartElement, this.sumTotalInCart(this.GOODSinCart))
      if(this.GOODSinCart.length === 0){
        HTMLelement.append(this.emptyCartMessage())
      }
    }else{
      return
    }
    });
  }
}

const CART_component = new Cart(".catalog_start");
export { CART_component };

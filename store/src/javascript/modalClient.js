import { CART_component } from "./cart.js"


class Modal_Client{
  ROOT_element
  openModalElement
  GoodsFromClientSendToServer
  correctClientData = false
  constructor(root){
    this.ROOT_element = root
  }
  renderModal(){

    const modalOpen = document.createElement('div')
    modalOpen.className = 'modal'
    this.openModalElement = modalOpen

    const modalWindow = document.createElement('div')
    modalWindow.className = 'modal__card modal__card_color'
    modalWindow.innerHTML = `
    <div class="modal__card-form-size">
          <div class="modal__card-title__item"><h2>Доставка</h2></div>

          <div class="modal__card-form">
            <div class="modal__card-form-name-phone">
              <form>
                <input type="text" name="name" placeholder="Ваше имя" />
                <input type="text" name="phone" placeholder="Телефон" />
              </form>
            </div>
            <div class="modal__card-delivery">
            <form>
            <label for="#first"
              ><input
                class="radio_input"
                type="radio"
                id="first"
                name="delivery=ByTheSame"
              />
              Самовывоз</label
            >
            <label for="#second"
              ><input
                class="radio_input"
                type="radio"
                id="second"
                name="delivery=ToClient"
              />
              Доставка</label
            >
          </form>
            </div>
            <div class="modal__card-address">
              <form>
                <input type="text" name="address" placeholder="Улица, дом, квартира" />
                <input type="text" name="floor" placeholder="Этаж" />
                <input type="text" name="domofon" placeholder="Домофон" />
              </form>
            </div>
          </div>
          <button class="modal__card-form-button">Оформить</button>
        </div>
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
        </button>
    `
    modalOpen.append(modalWindow)
    document.querySelector(this.ROOT_element).append(modalOpen)
    this.addListener(modalOpen)

  }
  closeModal(){
    this.openModalElement.remove()
  }
  set GoodsToSendToServer(goods){
    this.GoodsFromClientSendToServer = goods
  }
  addListener(HTMLElement){
    HTMLElement.addEventListener('click',()=>{

      if(event.target === HTMLElement || event.target.closest('.modal-close')){
        this.closeModal()
      }
      if(event.target.classList.contains('modal__card-form-button')){
        this.correctClientData = true
        let elems = {}
          for(let i = 0; i < HTMLElement.querySelectorAll('form').length; i++){
            const item = HTMLElement.querySelectorAll('form')[i]
            const newForm = new FormData(item)
            const data = Object.fromEntries(newForm)

            Object.keys(data).forEach((el)=>{
              elems[el] = data[el] === "" && (el === 'name' || el === 'phone') ? this.addError() : data[el]
            })
          }
          elems.products = this.GoodsFromClientSendToServer
          if(this.correctClientData){
            console.log(elems)
            /////
            //// send to Server
            ////
            CART_component.cartTonull()
            setTimeout(()=>{
              location.reload()
            },2000)
          }

      }
    })
  }
  addError(){
    this.correctClientData = false
    console.log('error')
    ////
    //// add error Uncorect clientData
    ////
  }
}

const MODAL_CLIENT_component = new Modal_Client("body")
export {MODAL_CLIENT_component}

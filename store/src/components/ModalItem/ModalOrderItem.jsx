import { useOrder } from "../../hooks/useOrder";

function ModalOrderItem() {
  const { isOpen, close, handleForm, postOrderToServet } = useOrder();
  if (isOpen) {
    return (
      <div className="modal">
        <div className="modal__card modal__card_color">
          <div className="modal__card-form-size">
            <div className="modal__card-title__item">
              <h2>Доставка</h2>
            </div>

            <form className="modal__card-form" onChange={handleForm}>
              <div className="modal__card-form-name-phone">
                {/* <form> */}
                <input type="text" placeholder="Ваше имя" name="name" />
                <input type="text" placeholder="Телефон" name="phone" />
                {/* </form> */}
              </div>
              <div className="modal__card-delivery">
                {/* <form> */}
                <label htmlFor="#first">
                  <input
                    className="radio_input"
                    type="radio"
                    id="first"
                    name="delivery"
                    value="clientBySelf"
                  />
                  Самовывоз
                </label>
                <label htmlFor="#second">
                  <input
                    className="radio_input"
                    type="radio"
                    id="second"
                    name="delivery"
                    value="toClient"
                  />
                  Доставка
                </label>
                {/* </form> */}
              </div>
              <div className="modal__card-address">
                {/* <form> */}
                <input
                  type="text"
                  placeholder="Улица, дом, квартира"
                  name="address"
                />
                <input type="text" placeholder="Этаж" name="floor" />
                <input type="text" placeholder="Домофон" name="domofon" />
                {/* </form> */}
              </div>
            </form>
            <button
              className="modal__card-form-button"
              onClick={postOrderToServet}
            >
              Оформить
            </button>
          </div>
          <button className="modal-close" onClick={close}>
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
        </div>
      </div>
    );
  }
}
export { ModalOrderItem };

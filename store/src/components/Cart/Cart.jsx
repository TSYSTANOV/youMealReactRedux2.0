import { useCart } from "../../hooks/useCart";
import { closeCart, openCart } from "../../redux/CartSlice";
import { openModal, setOrder } from "../../redux/ModalOrderSlice";
import { CartItem } from "./CartItem";
import { v4 as uuid4 } from "uuid";
function Cart() {
  const { totalSum, totalCount, dispatch, cartItems, cartRef, isOpen, cart } =
    useCart();
  return (
    <section className="cart_section">
      {/* <div className="container"> */}
      <section className="catalog_start">
        <div className="cart_container">
          <button
            className="cart_container_title"
            onClick={() => {
              dispatch(openCart());
            }}
          >
            <h2 className="cart_container_title_button">Корзина</h2>
            <span className="totalItems">{totalCount}</span>
          </button>
          <div className="cart__open" ref={cartRef}>
            <div className="cartGeneral__content">
              <div className="cart_container_content">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item) => {
                      return <CartItem key={item.id} {...item} />;
                    })}
                  </>
                ) : (
                  isOpen && (
                    <div>
                      <p>Cart is Empty</p>
                    </div>
                  )
                )}
              </div>
              <div className="cart_container__footer__block">
                <div className="cart_container_footer">
                  <p>Итого</p>
                  <p>
                    {totalSum} <span>₽</span>
                  </p>
                </div>
                <button
                  className="cart_container_footer_button"
                  disabled={cartItems.length === 0}
                  onClick={() => {
                    dispatch(openModal());
                    dispatch(
                      setOrder({
                        title: "goodsList",
                        value: cart,
                      })
                    );
                    dispatch(
                      setOrder({
                        title: "id",
                        value: uuid4(),
                      })
                    );
                  }}
                >
                  Оформить
                </button>
                <div className="cart_container_footer_info">
                  <p>Бесплатная доставка</p>
                  <button
                    onClick={() => {
                      dispatch(closeCart());
                    }}
                  >
                    Свернуть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </div> */}
    </section>
  );
}
export { Cart };

import { useDispatch, useSelector } from "react-redux";
import { handleModal } from "../../redux/ModalItemSlice";
import { BASE_URL } from "../../api/api";
import { useModalItem } from "../../hooks/useModalItem";
import { addToCart } from "../../redux/CartSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast, Bounce } from "react-toastify";
function ModalItem() {
  const { isOpen, activeItem } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { count, increaseCount, decreaseCount, setCount } = useModalItem();

  const handleAddToCart = () => {
    const itemToCart = { id: activeItem.id, count: count };
    dispatch(addToCart(itemToCart));
    dispatch(handleModal([]));
    setCount(1);
    toast.success(`Item ${activeItem.title} is added to cart!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  if (isOpen) {
    return (
      <div className="modal">
        <div className="modal__card">
          <div className="modal__card-title">
            <h2>{activeItem.title}</h2>
          </div>
          <div className="modal__card_information">
            <div className="modal_image">
              <img
                src={BASE_URL + "/" + activeItem.image}
                alt={activeItem.category}
              />
            </div>
            <div className="modal__card-content">
              <p className="modal__card-content_first">
                {activeItem.description}
              </p>
              <span className="modal__card-content-inset">Состав:</span>
              <ul>
                {activeItem.ingredients.map((el) => {
                  return <li key={el}>{el}</li>;
                })}
              </ul>
              <span className="modal__card-content-outset">
                {activeItem.weight}г, ккал {activeItem.calories}
              </span>
            </div>
            <div className="modal__footer_info">
              <div className="modal__card-footer">
                <button
                  className="modal__card-footer_button"
                  onClick={handleAddToCart}
                >
                  Добавить
                </button>
                <div className="card_number">
                  <button className="minus_number" onClick={decreaseCount}>
                    -
                  </button>
                  <p>{count}</p>
                  <button className="plus_number" onClick={increaseCount}>
                    +
                  </button>
                </div>
              </div>
              <div className="modal__card-summary">
                <p>
                  {activeItem.price * count}
                  <span>₽</span>
                </p>
              </div>
            </div>
          </div>
          <button
            className="modal-close"
            onClick={() => dispatch(handleModal([]))}
          >
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
export { ModalItem };

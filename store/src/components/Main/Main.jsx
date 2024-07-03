import { Cart } from "../Cart/Cart";
import { NavigationCategories } from "../Header/NavigationCategories";
import { ModalItem } from "../ModalItem/ModalItem";
import { ModalOrderItem } from "../ModalItem/ModalOrderItem";
import { ProductsList } from "./ProductsList/ProductsList";

function Main() {
  return (
    <>
      <main>
        <div className="container">
          <NavigationCategories />
          <section className="catalog">
            <Cart />
            <ProductsList />
          </section>
        </div>
      </main>
      <ModalItem />
      <ModalOrderItem />
    </>
  );
}
export { Main };

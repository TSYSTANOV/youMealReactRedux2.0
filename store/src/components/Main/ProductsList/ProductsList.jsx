import { useSelector } from "react-redux";
import { ProductsItem } from "./ProductsItem";

function ProductsList() {
  const { productsList } = useSelector((state) => state.products);
  const { activeCategory } = useSelector((state) => state.categories);
  return (
    <section className="cards_items">
      {/* <div className="container"> */}
      {/* <div className="cards_items_card"> */}
      <div className="cards_items_title">
        <h2>{activeCategory}</h2>
      </div>
      <div className="cards_items__products">
        {productsList.length === 0 && <h2>No found goods for this category</h2>}
        {productsList.map((item) => {
          return <ProductsItem key={item.id} {...item} />;
        })}
      </div>
      {/* </div> */}
      {/* </div> */}
    </section>
  );
}
export { ProductsList };

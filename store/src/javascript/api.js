class API {
  BASE_URL;
  constructor(url) {
    this.BASE_URL = url;
  }
  getGoods(id = "") {
    return fetch(`${this.BASE_URL}/api/product/${id}`).then((response) =>
      response.json()
    );
  }
  getListOfGoods(list) {
    return fetch(`${this.BASE_URL}/api/product?list=${list}`).then((response) =>
      response.json()
    );
  }
}
const API_component = new API("http://localhost:3024");
export { API_component };

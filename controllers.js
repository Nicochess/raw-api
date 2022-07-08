const data = require("./data");

class StoreController {
  async getProducts() {
    return new Promise((resolve, _) => resolve(data));
  }

  async getProduct(id) {
    return new Promise((resolve, reject) => {
      const product = data.find((product) => product.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(`A product with ID ${id} was not found.`);
      }
    });
  }
}

module.exports = StoreController;

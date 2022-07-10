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

  async soldProduct(id) {
    return new Promise((resolve, reject) => {
      const product = data.find((product) => product.id === parseInt(id));

      if (!product) {
        reject(`There is no product with ID ${id}`);
      } else {
        product.stock -= 1;
        resolve(product);
      }
    });
  }

  async createProduct(product) {
    return new Promise((resolve, _) => {
      let newProduct = {
        id: data[data.length - 1].id + 1,
        ...product,
      };

      resolve(newProduct);

      data.push(newProduct);
    });
  }

  async deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const product = data.find((product) => product.id === parseInt(id));

      if (product) {
        const index = data.indexOf(product);
        data.splice(index, 1);
        resolve(product);
      } else {
        reject(`There's no product with ID ${id}`);
      }
    });
  }
}

module.exports = StoreController;

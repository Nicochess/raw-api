const data = require("./data");

class StoreController {
  async getProduct() {
    return new Promise((resolve, _) => resolve(data));
  }
}

module.exports = StoreController
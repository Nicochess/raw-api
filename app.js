const http = require("http");
const Store = require("./controllers");
const { getReqData } = require("./utils");

const contentType = {
  "Content-Type": "application/json",
};

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/products" && req.method === "GET") {
    res.writeHead(200, contentType);
    const products = await new Store().getProducts();
    res.end(JSON.stringify(products));
  } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[2];
      const product = await new Store().getProduct(id);
      res.writeHead(200, contentType);
      res.end(JSON.stringify(product));
    } catch (error) {
      res.writeHead(404, contentType);
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === "PATCH") {
    try {
      const id = req.url.split("/")[2];
      const soldProduct = await new Store().soldProduct(id);
      res.writeHead(200, contentType);
      res.end(JSON.stringify(soldProduct));
    } catch (error) {
      res.writeHead(404, contentType);
      res.end(JSON.stringify({ message: error }));
    }
  } else if (req.url === "/products" && req.method === "POST") {
    const productData = await getReqData(req);
    const product = await new Store().createProduct(JSON.parse(productData));
    res.writeHead(200, contentType);
    res.end(JSON.stringify(product));
  } else if (req.url.match(/\/products\/([0-9]+)/) && req.method === "DELETE") {
    try {
      const id = req.url.split("/")[2];
      const product = await new Store().deleteProduct(id)
      res.writeHead(200, contentType)
      res.end(JSON.stringify(product))
    } catch (error) {
      res.writeHead(404, contentType);
      res.end(JSON.stringify({ message: error }));
    }
  } else {
    res.writeHead(404, contentType);
    res.end(JSON.stringify({ message: "Route not found." }));
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

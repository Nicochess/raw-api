const http = require("http");
const Store = require("./controllers");

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/home" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const products = await new Store().getProduct();
    res.end(JSON.stringify(products));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found." }));
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

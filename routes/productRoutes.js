const routes = require("express").Router();
const productController = require("../controllers/productController");
// const utilities = require("../utils");
const { valideRole } = require("../controllers/rolesMiddleware");

routes.post("/create", productController.upload, async (req, res, next) => {
  await productController.createProduct(req, res);
  next();
});

routes.put("/update/:id", productController.upload, async (req, res, next) => {
  await productController.updateProduct(req, res);
  next();
});

routes.delete("/delete/:id", async (req, res, next) => {
  await productController.deleteProduct(req, res);
  next();
});

routes.get("/list", async (req, res, next) => {
  const products = await productController.getAllProducts(req, res);

  if (products?.status === 0) {
    return res.status(404).json({ message: "products not found" });
  }
  console.log(products);
  return res.status(200).json(products);

  next();
});

routes.get("/details/:id", async (req, res, next) => {
  const product = await productController.getProductDetails(req, res);

  if (product.status === 0) {
    return res.status(401).json({ message: "product not found" });
  }
  return res.status(200).json(product);
  next();
});

routes.get("/search", async (req, res, next) => {
  await productController.searchProduct(req, res);
  next();
});

routes.post("/:id/review", async (req, res, next) => {
  await productController.createReview(req, res);
  next();
});

routes.get("/:id/reviews", async (req, res, next) => {
  const reviews = await productController.getReviews(req, res);
  res.json(reviews);
  next();
});

//admin

routes.post(
  "/product/create",
  productController.upload,
  valideRole(["admin"]),
  async (req, res, next) => {
    await productController.createProduct(req, res);
    next();
  }
);

routes.put(
  "/product/update/:id",
  productController.upload,
  valideRole(["admin"]),
  async (req, res, next) => {
    await productController.updateProduct(req, res);
    next();
  }
);

routes.delete(
  "/product/delete/:id",
  valideRole(["admin"]),
  async (req, res, next) => {
    await productController.deleteProduct(req, res);
    next();
  }
);

module.exports = routes;

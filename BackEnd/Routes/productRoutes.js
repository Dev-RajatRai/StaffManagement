import express from "express";
import { IsAdmin, requireSignIn } from "../middleWare/authMiddleware.js";
import { ProductCategoryController, brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, filterProductController, getAllProductsController, getProductPhotoController, getSingleProductsController, productCountController, productListController, realtedProductController, serchProductController, updateProductController } from "../Controlers/createProductController.js";
import formidable from "express-formidable";

const router = express.Router();

// Creating products
router.post("/create-product", requireSignIn, IsAdmin, formidable(), createProductController);

// Creating products
router.put("/update-product/:pid", requireSignIn, IsAdmin, formidable(), updateProductController);

// Get all products
router.get("/get-products", getAllProductsController);

// Get singlle products
router.get("/get-product/:slug", getSingleProductsController);

// Get photo of the product
router.get("/get-picture/:pid", getProductPhotoController);

// Delete the product
router.delete("/delete-product/:pid", deleteProductController);

// filter products
router.post("/filter-product", filterProductController);

// Product Count
router.get("/get-total-product", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// Search Product
router.get("/search/:keyword", serchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

// Find Product bsde of Category
router.get("/porudct-category/:slug", ProductCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
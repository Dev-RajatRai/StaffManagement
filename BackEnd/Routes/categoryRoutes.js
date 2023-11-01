import express from "express";
import { IsAdmin, requireSignIn } from "../middleWare/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController } from "../Controlers/categoryController.js";

const router = express.Router();

// Category routes

// Create category
router.post('/create-category', requireSignIn, IsAdmin, createCategoryController)

// Update category 
router.put("/update-category/:id", requireSignIn, IsAdmin, updateCategoryController);

// Get all categorys
router.get('/get-all-category', getAllCategoryController);

// Get all categorys
router.get('/single-category/:slug', getSingleCategoryController);

// Delete the Category
router.delete("/delete-category/:id", requireSignIn, IsAdmin, deleteCategoryController);

export default router;
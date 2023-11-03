import express from "express";
import { IsSuperAdmin, requireSignIn } from "../middleWare/authMiddleware.js";
import { createDepartmentController, deleteDepartmentController, getAllDepartmentController, getSingleDepartmentController, updateDepartmentController } from "../Controlers/departmentController.js";

const router = express.Router();

// Department routes

// Create Department
router.post('/create-department', requireSignIn, IsSuperAdmin, createDepartmentController)

// Update Department 
router.put("/update-department/:id", requireSignIn, IsSuperAdmin, updateDepartmentController);

// Get all Department
router.get('/get-all-department', getAllDepartmentController);

// Get all Department
router.get('/single-department/:slug', getSingleDepartmentController);

// Delete the Department
router.delete("/delete-department/:id", requireSignIn, IsSuperAdmin, deleteDepartmentController);

export default router;
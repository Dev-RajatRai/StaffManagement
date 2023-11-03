import express from "express";
import { IsSuperAdmin, requireSignIn } from "../middleWare/authMiddleware.js";
import { EmployeeDepartmentController, createEmployeeController, deleteEmployeeController, filterEmployeeController, getAllEmployeesController, getEmployeePhotoController, getSingleEmployeesController, EmployeeCountController, EmployeeListController, realtedEmployeeController, serchEmployeeController, updateEmployeeController } from "../Controlers/createEmployeeController.js";
import formidable from "express-formidable";

const router = express.Router();

// Creating employee
router.post("/create-employee", requireSignIn, IsSuperAdmin, formidable(), createEmployeeController);

// update the employee
router.put("/update-employee/:pid", requireSignIn, IsSuperAdmin, formidable(), updateEmployeeController);

// Get all employee
router.get("/get-employee", getAllEmployeesController);

// Get single employee
router.get("/get-employee/:slug", getSingleEmployeesController);

// Get photo of the employee
router.get("/get-employee/:pid", getEmployeePhotoController);

// remove the employee
router.delete("/delete-employee/:pid", deleteEmployeeController);

// filter employee
router.post("/filter-employee", filterEmployeeController);

// employee Count
router.get("/get-total-employee", EmployeeCountController);

// employee per page
router.get("/employee-list/:page", EmployeeListController);

// Search employee
router.get("/search/:keyword", serchEmployeeController);

//similar employee
router.get("/related-employee/:pid/:cid", realtedEmployeeController);

// Find employee bsde of department
router.get("/employee-department/:slug", EmployeeDepartmentController);

export default router;
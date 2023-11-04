import express from "express";
import { IsSuperAdmin, requireSignIn } from "../middleWare/authMiddleware.js";
import { EmployeeDepartmentController, createEmployeeController, deleteEmployeeController, filterEmployeeController, getAllEmployeesController, getSingleEmployeesController, EmployeeCountController, EmployeeListController, serchEmployeeController, updateEmployeeController } from "../Controlers/employeeController.js";
import formidable from "express-formidable";

const router = express.Router();

// Creating employee
router.post("/create-employee", requireSignIn, IsSuperAdmin, formidable(), createEmployeeController);

// update the employee
router.put("/update-employee-department/:id", requireSignIn, IsSuperAdmin, updateEmployeeController);

// Get all employee
router.get("/get-employee", getAllEmployeesController);

// Get single employee
router.get("/get-employee/:id", getSingleEmployeesController);


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

// Find employee bsde of department
router.get("/employee-department/:slug", EmployeeDepartmentController);

export default router;
import slugify from "slugify";
import fs from "fs";
import departmentModal from "../Modal/departmentModal.js";
import employeeModal from "../Modal/employeeModal.js";

// Creating a new Employee
export const createEmployeeController = async (req, res) => {

    try {
        const { name, email, pan, department, slug } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(404).send({ error: "Name is required" });
            case !email:
                return res.status(404).send({ error: "discription is required" });
            case !pan:
                return res.status(404).send({ error: "price is required" });
            case !department:
                return res.status(404).send({ error: "department is required" });
            case photo && photo.size > 1000000:
                return res.status(404).send({ error: "PHoto is required" });
        }
        const Employee = new employeeModal({
            ...req.fields, slug: slugify(name)
        })
        if (photo) {
            Employee.photo.data = fs.readFileSync(photo.path);
            Employee.photo.contentType = photo.type
        }
        await Employee.save()
        res.status(201).send({
            success: true,
            massage: "Employee Created Successfully",
            Employee
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "Error in the Creating Employee",
            error: error
        })
    }

}

// Get All employees
export const getAllEmployeesController = async (req, res) => {
    try {
        const employee = await employeeModal.find({}).populate('department').limit(25)
        res.status(200).send({
            success: true,
            totalCount: employee.length,
            massage: "Found all Employees",
            employee
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getting all Employees",
            error: error
        })
    }
}

// Get Single Employee
export const getSingleEmployeesController = async (req, res) => {
    try {
        const employee = await employeeModal.findOne({ _id: req.params.id })
        res.status(200).send({
            success: true,
            massage: "Found the Employee",
            employee
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in Getting single Employee",
            error: error
        })
    }
}

// update the profile of the employee
export const updateEmployeeController = async (req, res) => {
    try {
        const { department } = req.body;
        const id = req.params.id;
        if (!department) {
            return res.status(404).send({ error: "department is required ajsdfkaj" });
        }
        const Employee = await employeeModal.findByIdAndUpdate(id,
            {
                department: department
            }, { new: true })
        res.status(201).send({
            success: true,
            massage: "Employee updated  Successfully",
            Employee
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "Error in the update Employee",
            error
        })
    }
}

// Rmove the employee

export const deleteEmployeeController = async (req, res) => {
    try {
        await employeeModal.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success: true,
            massage: "Deleted the Employee succesfuly",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in delete Employee",
            error: error
        })
    }
}

// getting the employee by FIlter Controller
export const filterEmployeeController = async (req, res) => {
    try {
        const { radio } = req.body;
        let sortField = 'name';

        if (radio === 'accending by address' || radio === 'desending by address') {
            sortField = 'address';
        }

        const sortOrder = radio.includes('desending') ? -1 : 1;

        const employees = await employeeModal.find({}).limit(10).sort({ [sortField]: sortOrder });

        res.status(200).send({
            success: true,
            employee: employees
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting filtered Employees',
            error: error
        });
    }
};


// employees Count 
export const EmployeeCountController = async (req, res) => {
    try {
        const Total = await employeeModal.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            Total
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getting the Count the Employees",
            error: error

        })

    }
}

// List of the employee per page
export const EmployeeListController = async (req, res) => {
    try {
        const perPage = 8;
        const page = req.params.page ? req.params.page : 1;
        const employee = await employeeModal.find({}).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            employee
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getting employee list ",
            error: error

        })

    }
}

// Serch the employees 
export const serchEmployeeController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await employeeModal.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { department: { $regex: keyword, $options: "i" } },
            ],
        })
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in serching Employee",
            error: error
        })

    }
}


// employee Department 
export const EmployeeDepartmentController = async (req, res) => {
    try {
        const department = await departmentModal.findOne({ slug: req.params.slug });
        const employee = await employeeModal.find({ department: department.name });
        res.status(200).send({
            success: true,
            massage: "Found the Employee",
            employee: employee,
            department
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            massage: "error while getting employee department",
            error,
        });

    }
}

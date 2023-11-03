import slugify from "slugify";
import departmentModal from "../Modal/departmentModal.js";

// Create new Department
export const createDepartmentController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(404).send({ massage: "Name Is required" });
        }
        const existingDepartment = await departmentModal.findOne({ name });
        if (existingDepartment) {
            return res.status(200).send({
                massage: "department is already Existing"
            });
        }
        const department = await new departmentModal({ name, slug: slugify(name) }).save();
        res.status(200).send({
            success: true,
            massage: "Department created Successfully",
            department
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            massage: "error in creating department",
            error: error

        })
    }
}

// Update Existing Department

export const updateDepartmentController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const department = await departmentModal.findByIdAndUpdate(id,
            {
                name, slug: slugify(name)
            },
            { new: true }
        )
        res.status(200).send({
            success: true,
            massage: "updated the department",
            department
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in updating department",
            error: error
        })
    }
}

// Get All Departments
export const getAllDepartmentController = async (req, res) => {
    try {
        const department = await departmentModal.find({});
        res.status(200).send({
            success: true,
            massage: "All departments were founded",
            department
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getting all departments",
            error: error
        })
    }
}

// Get a Perticular Deepartment
export const getSingleDepartmentController = async (req, res) => {
    try {
        const department = await departmentModal.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            massage: "Found the department",
            department
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getting singe department",
            error: error
        })
    }
}

// Delete The Department 
export const deleteDepartmentController = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await departmentModal.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            massage: "Delete The Department",
            department
        })

    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                massage: "error in Deleting Department",
                error: error
            }
        )
    }
}
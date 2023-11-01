import slugify from "slugify";
import categoryModal from "../Modal/categoryModal.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(404).send({ massage: "Name Is required" });
        }
        const existingCategory = await categoryModal.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                massage: "category is already Existing"
            });
        }
        const catrgory = await new categoryModal({ name, slug: slugify(name) }).save();
        res.status(200).send({
            success: true,
            massage: "Category created Successfully",
            catrgory
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            massage: "error in creating Category",
            error: error

        })
    }
}

// updateCategoryController

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModal.findByIdAndUpdate(id,
            {
                name, slug: slugify(name)
            },
            { new: true }
        )
        res.status(200).send({
            success: true,
            massage: "updated the categoy",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in updating controller",
            error: error
        })
    }
}

export const getAllCategoryController = async (req, res) => {
    try {
        const category = await categoryModal.find({});
        res.status(200).send({
            success: true,
            massage: "All categorys are found",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getAllCategory",
            error: error
        })
    }
}
// getSingleCategoryController

export const getSingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModal.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            massage: "Found the Category",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getSingleCategoryController",
            error: error
        })
    }
}


// deleteCategoryController 

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const catrgory = await categoryModal.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            massage: "deleted The Category",
            catrgory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                massage: "error in deleteCategoryController",
                error: error
            }
        )
    }
}
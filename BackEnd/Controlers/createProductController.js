import slugify from "slugify";
import productModel from "../Modal/productModel.js";
import fs from "fs";
import categoryModal from "../Modal/categoryModal.js";
import orderModel from "../Modal/orderModle.js";

export const createProductController = async (req, res) => {

    try {
        const { name, slug, discription, price, quantity, category, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(404).send({ error: "Name is required" });
            case !discription:
                return res.status(404).send({ error: "discription is required" });
            case !price:
                return res.status(404).send({ error: "price is required" });
            case !quantity:
                return res.status(404).send({ error: "quantity is required" });
            case !category:
                return res.status(404).send({ error: "category is required" });
            case photo && photo.size > 1000000:
                return res.status(404).send({ error: "PHoto is required" });
        }
        const Product = new productModel({
            ...req.fields, slug: slugify(name)
        })
        if (photo) {
            Product.photo.data = fs.readFileSync(photo.path);
            Product.photo.contentType = photo.type
        }
        await Product.save()
        res.status(201).send({
            success: true,
            massage: "Product Created Successfuy",
            Product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "Error in the createproductsController",
            error: error
        })
    }

}

export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(25).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalCount: products.length,
            massage: "Found all Products",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getAllProductsController",
            error: error
        })
    }
}

export const getSingleProductsController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            massage: "Found the PRoduuct",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getSingleProductsController",
            error: error
        })
    }
}

// Product picture 

export const getProductPhotoController = async (req, res) => {
    try {
        const productPictre = await productModel.findById(req.params.pid).select("photo");
        if (productPictre.photo.data) {
            res.set('Content-type', productPictre.photo.contentType)
            return res.status(200).send(productPictre.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getProductPhotoController",
            error: error
        })
    }
}

// updateProductController
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, discription, price, quantity, category, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(404).send({ error: "Name is required" });
            case !discription:
                return res.status(404).send({ error: "discription is required" });
            case !price:
                return res.status(404).send({ error: "price is required" });
            case !quantity:
                return res.status(404).send({ error: "quantity is required" });
            case !category:
                return res.status(404).send({ error: "category is required" });
            case photo && photo.size > 1000000:
                return res.status(404).send({ error: "PHoto is required" });
        }
        const Product = await productModel.findByIdAndUpdate(req.params.pid,
            {
                ...req.fields, slug: slugify(name)
            }, { new: true })
        if (photo) {
            Product.photo.data = fs.readFileSync(photo.path);
            Product.photo.contentType = photo.type
        }
        await Product.save()
        res.status(201).send({
            success: true,
            massage: "Product updated  Successfully",
            Product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "Error in the updateProductController",
            error: error
        })
    }
}

// deleteProductController

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).send({
            success: true,
            massage: "Deleted the Produuct succesfuly",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in deleteProductController",
            error: error
        })
    }
}

// FIlter Controller
export const
    filterProductController = async (req, res) => {
        try {
            const { CatFilter, radio } = req.body;
            let args = {};
            if (CatFilter.length > 0) args.category = CatFilter;
            if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
            const products = await productModel.find(args);
            res.status(200).send({
                success: true,
                products
            })
        } catch (error) {
            console.log();
            res.status(500).send({
                success: false,
                massage: "error in filterProductController",
                error: error
            })
        }
    }

// productCountController
export const productCountController = async (req, res) => {
    try {
        const Total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            Total
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in productCountController",
            error: error

        })

    }
}

// productListController

export const productListController = async (req, res) => {
    try {
        const perPage = 8;
        const page = req.params.page ? req.params.page : 1;
        const Products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            Products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in productListController",
            error: error

        })

    }
}

// serchProductController
export const serchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { discription: { $regex: keyword, $options: "i" } },
            ],
        }).select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in serchProductController",
            error: error

        })

    }
}

// similar products
export const realtedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid },
        }).select("-photo").limit(3).populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            massage: "error while geting related product",
            error,
        });
    }
};

// ProductCategoryController

export const ProductCategoryController = async (req, res) => {
    try {
        const category = await categoryModal.findOne({ slug: req.params.slug });
        const Products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            massage: "Found the Products",
            Products,
            category
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            massage: "error while ProductCategoryController",
            error,
        });

    }
}

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

//payment
export const brainTreePaymentController = async (req, res) => {
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};
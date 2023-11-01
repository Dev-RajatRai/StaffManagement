import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "Product",
            },
        ],
        payment: {},
        buyer: {
            type: mongoose.ObjectId,
            ref: "Users",
        },
        status: {
            type: String,
            default: "Not Process",
            enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderModel);
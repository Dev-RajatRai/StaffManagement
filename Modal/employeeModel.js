import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pan: {
        type: Number,
        required: true,
    },
    department: {
        type: mongoose.ObjectId,
        ref: "department",
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
}
)

export default mongoose.model("employee", EmployeeSchema)
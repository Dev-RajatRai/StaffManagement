import mongoose from 'mongoose';

const employeeModal = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: 1
    },
    department: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true })
export default mongoose.model('Employee', employeeModal)
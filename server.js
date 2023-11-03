import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDb from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js"
import departmentRoutes from './Routes/departmentRoutes.js'
import productRoutes from "./Routes/productRoutes.js"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";

// env config
dotenv.config();

// database config
connectDb();


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Rest Object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "./client/build")))

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/employee", productRoutes)


// Rest api
app.get('/', (req, res) => {
    res.send("<h1>helo world From Jerry</h1>")
})
// PORT
const PORT = process.env.PORT || 5050;

// Run Listen 
app.listen(PORT, () => {
    console.log(`${process.env.DEV_MODE} iS Running ON ${PORT}`);
})

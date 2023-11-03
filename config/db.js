import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MOMGO_URL);
        console.log(`Connected to mongoDb is sucessfully and the host is ${conn.connection.host}`)

    } catch (error) {
        console.log(`Error in MongoDb Connection || MongoDB and the Error is ${error}`);
    }
}
export default connectDb;
import mongoose from "mongoose";

const connectMongoDb = () => {
    try {
        mongoose.connect(process.env.MONGODB_UR)
        console.log("Connected MongoDb")
    } catch (error) {
        console.log(error);
    }
}

export default connectMongoDb;
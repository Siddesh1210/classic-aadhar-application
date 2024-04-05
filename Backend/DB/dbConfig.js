import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
async function dbConfig()
{
    await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_Name}`)
    .then(()=>{
        console.log("DB connected successfully");
    })
    .catch((error)=>{
        console.log("Error is : "+error);
    })
}

export default dbConfig;
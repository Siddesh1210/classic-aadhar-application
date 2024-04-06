import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    refreshToken:{
        type:String,
    },
    accessToken:{
        type:String,
    }
})

adminSchema.pre("save",async function(next){
    const user=this;
    if(user.isModified("password")){
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password,salt);
    }
    next();
})

const Admin=mongoose.model("Admin",adminSchema);
export default Admin;
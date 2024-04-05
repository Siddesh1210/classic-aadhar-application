import express from  'express' 
import cors from 'cors'
import dotenv from 'dotenv';
import dbConfig from './DB/dbConfig.js';
import userRoute from './Routes/user.route.js'
dotenv.config()
const app=express()

app.use(express.json())
app.use(cors())

dbConfig()

app.use("/users", userRoute)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(process.env.PORT || 5000,()=>{
    console.log('Server is running on port 8000');
})
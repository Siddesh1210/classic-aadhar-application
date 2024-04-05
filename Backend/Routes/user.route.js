import express from 'express';
const routes=express.Router();
const app=express();

routes.get("/",(req,res)=>{
    res.send("Hello World from User routes")
})

export default routes;
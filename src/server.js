// require ("./db/connection");//
// const {sequelize}=require("./db/connection");
require ("dotenv").config();
const express = require ("express");
const cors = require ("cors");
const app = express();
const port = process.env.PORT || 5002;
const userRouter = require("./user/routes");//


app.use(express.json());
app.use(cors());
app.use(userRouter);
console.log("server working");

// app.get("/",(req,res)=>{
//     res.send("Hello world");
// })

app.listen(port, ()=>{
    console.log("App is listening");
})
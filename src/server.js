require ("dotenv").config();
const express = require ("express");
const cors = require ("cors");

const port = process.env.PORT || 5002;

const app = express();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(port, ()=>{
    console.log("App is listening");
})
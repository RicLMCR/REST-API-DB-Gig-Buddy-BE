// require ("./db/connection");//
// const {sequelize}=require("./db/connection");
require ("dotenv").config();
const express = require ("express");
const cors = require ("cors");
const app = express();
const port = process.env.PORT || 5001;
const userRouter = require("./user/routes");
const eventRouter = require("./event/routes");//
const { sequelize } = require("./db/connection");
const User = require("./user/model");
const Event = require("./event/model")


app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(eventRouter);
console.log("server working");

// app.get("/",(req,res)=>{
//     res.send("Hello world");
// })

app.listen(port, async ()=>{
    await User.sync({alter:true})
    await Event.sync({alter:true}) // All new tables need to be added here
    console.log(`App is listening on ${port}`);
})
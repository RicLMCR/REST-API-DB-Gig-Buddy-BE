// require ("./db/connection");//
// const {sequelize}=require("./db/connection");
require ("dotenv").config();
const express = require ("express");
const cors = require ("cors");
const app = express();
const port = process.env.PORT || 5002;
const userRouter = require("./user/routes");//
const { sequelize } = require("./db/connection");
const User = require("./user/model");
const Event = require("./event/model")


app.use(express.json());
app.use(cors());
app.use(userRouter);
console.log("server working");

// app.get("/",(req,res)=>{
//     res.send("Hello world");
// })

<<<<<<< Updated upstream
app.listen(port, async ()=>{
    await User.sync({alter:true})
    await Event.sync({alter:true}) // All new tables need to be added here
=======
const { sequelize } = require("./db/connection");
const User = require("./user/model");
app.listen(port, ()=>{
    // await User.sync({ alter: true });
    // await Event.sync({ alter: true });
>>>>>>> Stashed changes
    console.log(`App is listening on ${port}`);
})
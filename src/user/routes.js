const { Router } = require("express"); 
const userRouter = Router();
const { createUser, tokenLoginUser, updateUser, deleteUser } = require("../user/controllers");
// const {hashPassword, unhashPassword, tokenCheck} = require("../middleware"); // Leaving out for now until BE working

const User = require("../user/model");

userRouter.post("/user", createUser);
// userRouter.get("/user", tokenCheck, tokenLoginUser); // Leaving out for now until BE working
// userRouter.post("/login", unhashPassword, tokenLoginUser);  // Leaving out for now until BE working
// userRouter.put("/user", updateUser);
// userRouter.delete("/user", deleteUser);

module.exports = userRouter;
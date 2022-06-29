const { Router } = require("express"); 
const userRouter = Router();
const { createUser, findAllUsers, tokenLoginUser, updateUser, deleteUser } = require("./controllers");
const {hashPassword, unhashPassword, tokenCheck, userInputCheck, updateInputCheck} = require("../middleware");

// const User = require("./model");

userRouter.post("/user",userInputCheck, hashPassword, createUser);
userRouter.get("/allusers", findAllUsers);
userRouter.get("/user", tokenCheck, tokenLoginUser); // persistent login
userRouter.post("/login", unhashPassword, tokenLoginUser);  // user login
userRouter.put("/user", updateInputCheck, hashPassword, updateUser); // updating user takes into account all previous checks.
userRouter.delete("/user", deleteUser);


module.exports = userRouter;
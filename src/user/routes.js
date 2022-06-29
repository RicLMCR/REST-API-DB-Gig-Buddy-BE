const { Router } = require("express"); 
const userRouter = Router();
const { createUser, findAllUsers } = require("./controllers");
const { hashPassword, unHash } = require("../middleware")

// const { createUser, tokenLoginUser, updateUser, deleteUser } = require("./controllers");
// const {hashPassword, unhashPassword, tokenCheck} = require("../middleware"); // Leaving out for now until BE working

const User = require("./model");

 userRouter.post("/user", hashPassword, createUser);
 userRouter.get("/user", findAllUsers);
 userRouter.post("/login", unHash)
//userRouter.get("/user", tokenCheck, tokenLoginUser); // Leaving out for now until BE working
// userRouter.post("/login", unhashPassword, tokenLoginUser);  // Leaving out for now until BE working
// userRouter.put("/user", updateUser);
// userRouter.delete("/user", deleteUser);

module.exports = userRouter;
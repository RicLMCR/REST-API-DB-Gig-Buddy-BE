const { Router } = require("express"); 
const userRouter = Router();
const { createUser, findAllUsers, tokenLoginUser, updateUser, deleteUser } = require("./controllers");
const {hashPassword, unhashPassword, tokenCheck, userInputCheck, updateInputCheck} = require("../middleware");

const User = require("./model");

userRouter.post("/user", userInputCheck, hashPassword, createUser);//
userRouter.get("/allusers", findAllUsers);
userRouter.get("/user", tokenCheck, tokenLoginUser); // persistent login
userRouter.post("/login", unhashPassword, tokenLoginUser);  // user login
userRouter.put("/user", updateInputCheck, hashPassword, updateUser); // updating user takes into account all previous checks.
userRouter.delete("/:username", deleteUser);

userRouter.get("/profile/:username", async (req, res) => {
    console.log(req.params.username.substring(1))
    const user = await User.findOne({where: { username: req.params.username.substring(1) }, attributes: ["username", "firstname", "surname", "events_attending"]});
    console.log(user);
    res.status(200).json({profile: user});
});

// userRouter.get("/profile/:id", async (req, res) => {
//     const user = await User.findOne({where: { id: req.params.id }, attributes: ["username", "firstname", "surname", "events_attending"]});
//     // console.log(user);
//     res.status(200).json({profile: user});
// });

module.exports = userRouter;
const { Router } = require("express"); 
const userRouter = Router();
const { createUser, findAllUsers, tokenLoginUser, updateUser, deleteUser, sendRequest } = require("./controllers");
const {hashPassword, unhashPassword, tokenCheck, userInputCheck, updateInputCheck} = require("../middleware");

const User = require("./model");

userRouter.post("/user", userInputCheck, hashPassword, createUser);//
userRouter.get("/allusers", findAllUsers);
userRouter.get("/user", tokenCheck, tokenLoginUser); // persistent login
userRouter.post("/login", unhashPassword, tokenLoginUser);  // user login
userRouter.put("/user", updateInputCheck, hashPassword, updateUser); // updating user takes into account all previous checks.
userRouter.delete("/:username", deleteUser);

userRouter.get("/profile/:username", async (req, res) => {
    const user = await User.findOne({where: { username: req.params.username }, attributes: ["username", "firstname", "surname", "eventsAttending"]});
    console.log(user);
    res.status(200).json({profile: user});
});

userRouter.put("/buddy/request", sendRequest);

userRouter.get("/notifications/:username", async (req, res) => {
    const notifications = await User.findOne({where: { username: req.params.username }, attributes: ["buddyRequests"]});
    // console.log(notifications);
    res.status(200).json({notifications});
});
module.exports = userRouter;
const { Router } = require("express"); 
const userRouter = Router();
const { createUser, findAllUsers, tokenLoginUser, updateUser, deleteUser, sendRequest, updatePicture } = require("./controllers");
const {hashPassword, unhashPassword, tokenCheck, userInputCheck, updateInputCheck} = require("../middleware");

const User = require("./model");

userRouter.post("/user", userInputCheck, hashPassword, createUser);//
userRouter.get("/allusers", findAllUsers);
userRouter.get("/user", tokenCheck, tokenLoginUser); // persistent login
userRouter.post("/login", unhashPassword, tokenLoginUser);  // user login
userRouter.put("/user", updateInputCheck, hashPassword, updateUser); // updating user takes into account all previous checks.

userRouter.delete("/:username", deleteUser);
userRouter.get("/profile/:username", async (req, res) => {
    const user = await User.findOne({where: { username: req.params.username }, attributes: ["username","imageUrl", "firstname", "surname", "eventsAttending", "buddies", "buddyRequests"]});
    // console.log(user.buddyRequests);
    let buddyRequests = user.buddyRequests
    let newBuddyRequests = []
    for (let item = 0; item < buddyRequests.length; item++){
        newBuddyRequests.push(JSON.parse(buddyRequests[item])) 
    }
    // console.log(newBuddyRequests);
    user.buddyRequests = newBuddyRequests
    res.status(200).json({profile: user});
});

userRouter.put("/buddy/request", sendRequest);
// userRouter.get("/notifications/:username", async (req, res) => {
//     const notifications = await User.findOne({where: { username: req.params.username }, attributes: ["buddyRequests"]});
//     // console.log(notifications);
//     res.status(200).json({notifications});
// });

userRouter.put("/picture", updatePicture);

module.exports = userRouter;
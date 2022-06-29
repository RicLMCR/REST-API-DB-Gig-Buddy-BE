// const jwt = require("jsonwebtoken")
const User = require("./model");

exports.createUser = async (req, res) => {
    console.log("abouT to create user");
    try {
        const userObj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        console.log("about to create newUser");
        const newUser = await User.create(userObj); // insert data into SQL table

        console.log(`Successfully added ${newUser.dataValues.username} to the database of users!`);
        
        // const token = await jwt.sign({id: newUser._id}, process.env.SECRET);
        // res.send({ newUser, token });
        res.send({newUser});
    } catch (error) {
        console.log(error);
    }
}


exports.findAllUsers = async (req, res)  => {
    try {
        console.log("GET request returning all users") // Use GET with empty { } to return all users in DB
       const users = await User.findAll()
       res.send(users)
    } catch (error) {
        console.log(error)
    }
}
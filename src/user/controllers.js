const jwt = require("jsonwebtoken")
const User = require("./model");

exports.createUser = async (req, res) => {
    try {
        const userObj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        const newUser = await User.create(userObj); // insert data into SQL table

        console.log(`Successfully added ${newUser.dataValues.username} to the database of users!`);
        
        const token = await jwt.sign({id: newUser._id}, process.env.SECRET);
        res.send({ newUser, token });
    } catch (error) {
        console.log(error);
    }
}
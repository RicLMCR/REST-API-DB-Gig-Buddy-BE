const jwt = require("jsonwebtoken")
const User = require("./model");

exports.createUser = async (req, res) => {
    // console.log("about to create user");
    try {
        const userObj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        // console.log("about to create newUser");
        const newUser = await User.create(userObj); // insert data into SQL table
        console.log(newUser);
        console.log(`Successfully added ${newUser.dataValues.username} to the database of users!`);
        
        const token = await jwt.sign({id: newUser.id}, process.env.SECRET);
        console.log(`token ${token}`)
        res.send({ newUser, token });
    } catch (error) { 
        // console.log(error.errors[0].message);
        console.log(error);
        if (error.errors) res.send({error: error.errors[0].message});
        else res.send({error: error.message});
        

    }
}
// for dev only
exports.findAllUsers = async (req, res)  => {
    try {
        console.log("GET request returning all users"); // Use GET with empty { } to return all users in DB
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        console.log(error);
    }
}

// login without credentials but also let a user login in the first place.
exports.tokenLoginUser = async (req, res) => {
    token = await jwt.sign({ id: req.user.id }, process.env.SECRET);
    console.log(`User ${req.user.username} has logged in.`);
    res.send({user: req.user, token});
}

exports.updateUser = async (req, res) => {
    try {
        const newUserObj = {
            username: req.body.newUsername,
            email: req.body.newEmail,
            password: req.body.newPassword
        };
        // console.log(req.body.username);
        // console.log(newUserObj);
        const updateRes = await User.update(newUserObj, { where: {username: req.body.username}});
        // console.log(updateRes);
        if (updateRes[0] > 0) { 
            res.send({message: "Account information has been updated"});
        }else if (false) {
            res.send({error: "Username does not exist."});
        }else {
            res.send({error: "Account information did not update"});
        }
    } catch (error) {
        console.log(error);
        res.send({error: "Account information did not update."});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedres = await User.destroy({where: {username: req.body.username}});
        // console.log(deletedres);
        if (deletedres > 0){
            console.log(`Account has been deleted. Goodbye ${req.body.username}.`)
            res.send({message: `Account has been deleted. Goodbye ${req.body.username}.`});
            
        }else {
            console.log("Something went wrong.")
            res.send({error: "Delete request failed: Username does not exist or wrong information provided."});
        }
    } catch (error) {
        // res.send( {deletedUserRES} );
        return res.status(500).send({error: error.message});
    }
};
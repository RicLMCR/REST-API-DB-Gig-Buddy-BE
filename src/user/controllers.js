const jwt = require("jsonwebtoken");
const User = require("./model");
const Event = require("../Event/model");

exports.createUser = async (req, res) => {
    // console.log("about to create user");
    try {
        const userObj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            imageUrl: req.body.imageUrl
            
        };
        console.log("about to create newUser");
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
        }else {
            res.send({error: "Account information did not update"});
        }
    } catch (error) {
        console.log(error);
        if (error.errors) res.send({error: error.errors[0].message});
        else res.send({error: "Account information did not update."});
    }
};

exports.deleteUser = async (req, res) => {
    console.log("restapi delete hit", req.body.username);
    try {
        const eventArr = await Event.findAll()
        for (let obj = 0; obj < eventArr.length; obj++) {

            // check if user is an attendee for any event
            if (eventArr[obj].dataValues.attendees.includes(`${req.body.username}`)){
                // remove them from any lists if they are
                eventArr[obj].dataValues.attendees.splice(eventArr[obj].dataValues.attendees.indexOf(req.body.username), 1);
                await Event.update({attendees: eventArr[obj].dataValues.attendees }, { where: {eventId: eventArr[obj].dataValues.eventId}});
            }
        }
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

exports.sendRequest = async (req, res) =>{
    try {
        const potentialBuddy = await User.findOne({where: { username: req.body.potentialBuddy }});
        if (potentialBuddy === null) {
            res.status(400).json({error: "Requested user not found in database"});
        }else {
            let buddyRequests = potentialBuddy.buddyRequests;
            for (let item = 0; item < buddyRequests.length; item++){
                // converts string into JSON to check if user has already sent a request
                let obj = JSON.parse(buddyRequests[item]) 
                if (obj.username === req.body.username) {
                    return res.status(400).json({error: `${req.body.potentialBuddy} has not responded to previous request!`});
                }
            }
            buddyRequests.push({ username: req.body.username,imageUrl: req.body.imageUrl});
            await User.update({buddyRequests: buddyRequests}, { where: {username: req.body.potentialBuddy}});
            res.status(200).json({message: `Request has been sent to ${req.body.potentialBuddy}!`});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.updatePicture = async (req, res) => {
    try {
        const updatePicture = await User.update({imageUrl: req.body.imageUrl}, { where: {username: req.body.username}});
        if (updatePicture[0] > 0) { 
            res.send({message: "Profile picture has been updated"});
        }else {
            res.send({error: "Profile picture did not update"});
        }
    } catch (error) {
        console.log(error);
        if (error.errors) res.send({error: error.errors[0].message});
        else res.send({error: error});
    }
}

exports.sendResponse = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        if (error.errors) res.send({error: error.errors[0].message});
        else res.send({error: error});
    }
}
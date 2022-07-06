const Event = require("./model");
const User = require("../user/model");

exports.createEvent = async (req, res) => {
    // validate request post body
    if (typeof(req.body.eventId) !== "string" || typeof(req.body.username) !== "string"){
        return res.status(400).json({error: "bad request - eventId and username must be string"});
    }
    try {
        const existingEvent = await Event.findOne({where: { eventId: req.body.eventId }});
        const existingUser = await User.findOne({where: { username: req.body.username }});
        
        if (existingUser === null) {
            return res.status(400).json({error: "user not found in database"});
        }
        let eventsAttending = existingUser.eventsAttending;
        if (existingEvent === null) {
            // create event if it doesn't exist in database and add user to attendees list
            const userEvent = await Event.create({eventId: req.body.eventId, attendees: [req.body.username]});
            // update user eventsAttending list
            eventsAttending.push(req.body.eventId);
            await User.update({eventsAttending: eventsAttending}, { where: {username: req.body.username}});
            res.send( {userEvent});
        } else {
            // update existing event of attendees
            let attendees = existingEvent.attendees;
            if (attendees.includes(req.body.username)){
                // returns error if user is already in attendees list
                res.status(400).json({error: "user is already attending event"});
            } else {
                attendees.push(req.body.username);
                eventsAttending.push(req.body.eventId);
                await Event.update({attendees: attendees }, { where: {eventId: req.body.eventId}});
                await User.update({eventsAttending: eventsAttending}, { where: {username: req.body.username}});
                res.status(200).json({userEvent: existingEvent});
            }
        }
    } catch (error) { 
        console.log(error);
        if (error.errors) {
            res.send({error: error.errors[0].message}); 
        } else {
            res.send({error: error.message});
        } 
    }
}

exports.removeAttendee = async (req, res) => {
    // validate request post body
    if (typeof(req.body.eventId) !== "string" || typeof(req.body.username) !== "string"){
        return res.status(400).json({error: "bad request - eventId and username must be string"});
    }
    try {
        const existingEvent = await Event.findOne({where: { eventId: req.body.eventId }});
        let attendees = existingEvent.attendees;
        const existingUser = await User.findOne({where: { username: req.body.username }});
        let eventsAttending = existingUser.eventsAttending;
        if (!attendees.includes(req.body.username)){
            // returns error if user is not in attendees list
            res.status(400).json({error: "user is not attending event"});
        } else {
            // find position of attendee and remove them
            attendees.splice(attendees.indexOf(req.body.username), 1);
            await Event.update({attendees: attendees }, { where: {eventId: req.body.eventId}});
            // same for their own eventsAttending list
            eventsAttending.splice(eventsAttending.indexOf(req.body.eventId), 1);
            await User.update({eventsAttending: eventsAttending }, {where: {username: req.body.username}});
            res.status(200).json({userEvent: existingEvent });
        }
    } catch (error) {
        console.log(error);
        if (error.errors) {
            res.send({error: error.errors[0].message}); 
        } else {
            res.send({error: error.message});
        } 
    }
}
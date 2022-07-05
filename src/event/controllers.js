const Event = require("./model");
const User = require("../user/model");

exports.createEvent = async (req, res) => {
    // validate request post body
    if (typeof(req.body.eventId) !== "number" || typeof(req.body.username) !== "string"){
        return res.status(400).json({error: "bad request - eventId must be number and username must be string"});
    }
    try {
        const existingEvent = await Event.findOne({where: { event_id: req.body.eventId }});
        const existingUser = await User.findOne({where: { username: req.body.username }});
        let events_attending = existingUser.events_attending;
        if (existingUser === null) {
            res.status(400).json({error: "user not found in database"});
        }else if (existingEvent === null) {
            // create event if it doesn't exist in database and add user to attendees list
            const userEvent = await Event.create({event_id: req.body.eventId, attendees: [req.body.username]});
            // update user events_attending list
            events_attending.push(req.body.eventId);
            await User.update({events_attending: events_attending}, { where: {username: req.body.username}});
            res.send( {userEvent});
        } else {
            // update existing event of attendees
            let attendees = existingEvent.attendees;
            if (attendees.includes(req.body.username)){
                // returns error if user is already in attendees list
                res.status(400).json({error: "user is already attending event"});
            } else {
                attendees.push(req.body.username);
                events_attending.push(req.body.eventId);
                await Event.update({attendees: attendees }, { where: {event_id: req.body.eventId}});
                await User.update({events_attending: events_attending}, { where: {username: req.body.username}});
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
    if (typeof(req.body.eventId) !== "number" || typeof(req.body.username) !== "string"){
        return res.status(400).json({error: "bad request - eventId must be number and username must be string"});
    }
    try {
        const existingEvent = await Event.findOne({where: { event_id: req.body.eventId }});
        let attendees = existingEvent.attendees;
        const existingUser = await User.findOne({where: { username: req.body.username }});
        let events_attending = existingUser.events_attending;
        if (!attendees.includes(req.body.username)){
            // returns error if user is not in attendees list
            res.status(400).json({error: "user is not attending event"});
        } else {
            // find position of attendee and remove them
            attendees.splice(attendees.indexOf(req.body.username), 1);
            await Event.update({attendees: attendees }, { where: {event_id: req.body.eventId}});
            // same for their own events_attending list
            events_attending.splice(events_attending.indexOf(req.body.eventId), 1);
            await User.update({events_attending: events_attending }, {where: {username: req.body.username}});
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
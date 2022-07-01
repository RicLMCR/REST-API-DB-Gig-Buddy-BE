const Event = require("./model");

exports.createEvent = async (req, res) => {
    const eventObj = {
        event_id: req.body.eventId,
        attendees: req.body.username
    };

    try {
        const newEvent = await Event.create({event_id: req.body.eventId, attendees: [req.body.username]});
        console.log(newEvent);
        
        res.send({ newEvent });
    } catch (error) { 
        console.log(error);
        if (error.errors) {
            if (error.errors[0].message === "event_id must be unique") {
                const newEvent = await Event.findOne({where: { event_id: req.body.eventId }});
                res.status(200).json({newEvent});
            }else {
                res.send({error: error.errors[0].message});
            }
            
        } else res.send({error: error.message});
    }
}
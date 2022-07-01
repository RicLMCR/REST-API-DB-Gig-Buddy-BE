const Event = require("./model");

exports.createEvent = async (req, res) => {
    try {
        const eventObj = {
            event_id: req.body.eventId,
        };

        const newEvent = await Event.create(eventObj);
        console.log(newEvent);
        
        res.send({ newEvent });
    } catch (error) { 
        console.log(error);
        if (error.errors) {
            res.send({error: error.errors[0].message});
        } 
        else res.send({error: error.message});
    }
}
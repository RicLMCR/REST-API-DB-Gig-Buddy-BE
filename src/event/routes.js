const { Router } = require("express"); 
const eventRouter = Router();
const {createEvent, removeAttendee} = require("./controllers");
const {eventInputCheck} = require("../middleware");
const Event = require("./model");

eventRouter.post("/event/create", createEvent);
eventRouter.post("/attendee/remove", removeAttendee);

eventRouter.get("/event/:id", async (req, res) => {
    const event = await Event.findOne({where: { event_id: req.params.id.substring(1) }, attributes: ["event_id", "attendees"]});
    res.status(200).json(event);
});



eventRouter.get("/allevents", async (req, res) => {
    try {
        const events = await Event.findAll();
        res.send(events);
    } catch (error) {
        console.log(error);
    }
} );    

module.exports = eventRouter;


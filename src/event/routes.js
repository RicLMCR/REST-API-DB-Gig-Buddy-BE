const { Router } = require("express"); 
const eventRouter = Router();
const {createEvent, removeAttendee} = require("./controllers");
const {eventInputCheck} = require("../middleware");
const Event = require("./model");

eventRouter.post("/event/create", createEvent);
eventRouter.post("/attendee/remove", removeAttendee);




eventRouter.get("/allevents", async (req, res) => {
    try {
        const events = await Event.findAll();
        res.send(events);
    } catch (error) {
        console.log(error);
    }
} );    

module.exports = eventRouter;


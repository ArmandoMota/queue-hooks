const Event = require("../models/event");

const getEvents = (req, res, next) => {
  Event.find({})
    .then((events) => {
      res.json({ events });
    })
    .catch((error) => console.log(error));
};

const createEvent = (req, res, next) => {
  Event.create(req.body)
    .then((event) => {
      res.json({ event });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getEvents = getEvents;
exports.createEvent = createEvent;

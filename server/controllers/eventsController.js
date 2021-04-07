const Event = require("../models/event");

const createEvent = (req, res, next) => {
  Event.create(req.body)
    .then((event) => {
      req.event = event;
      next();
    })
    .catch((error) =>
      console.log("Error while creating event ${req.body.topic}")
    );
};

exports.createEvent = createEvent;

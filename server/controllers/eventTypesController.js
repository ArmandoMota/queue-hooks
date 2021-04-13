const EventType = require("../models/eventType");

const getEventTypes = (req, res, next) => {
  EventType.find({ app_id: req.params.app_id })
    .then((eventTypes) => {
      res.json(eventTypes);
    })
    .catch((error) => console.log(error));
};

const createEventType = (req, res, next) => {
  const app_id = req.params.app_id;
  const description = req.body.description;

  EventType.create({ app_id, description })
    .then((eventType) => {
      res.json(eventType);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getEventTypes = getEventTypes;
exports.createEventType = createEventType;

const Message = require("../models/message");
const queue = require("./queueController");

const getMessages = (req, res, next) => {
  Message.find({})
    .then((msgs) => res.json({ msgs }))
    .catch((error) => console.log(error));
};

const createMessages = (req, res, next) => {
  const data = {
    topic: req.event.topic,
    eventId: req.event.id,
    affectedResource: req.event.affectedResource,
    payload: req.event.payload,
  };

  req.subscribers.forEach(({ id, url }) => {
    Message.create({ ...data, subscriptionId: id })
      .then((msg) => {
        msg.url = url;
        queue.push(msg, (error) => {
          console.log("error while adding message ${msg._id} to message queue");
          // handle later - what if pushing onto message queue fails?
        });
      })
      .catch((error) => console.log(error));
  });

  res.sendStatus(200);
};

exports.getMessages = getMessages;
exports.createMessages = createMessages;

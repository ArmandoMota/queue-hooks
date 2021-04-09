const Message = require("../models/message");
const queue = require("./queueController");

const getMessages = (req, res, next) => {
  Message.find({})
    .then((msgs) => res.json({ msgs }))
    .catch((error) => console.log(error));
};

const createMessages = (req, res, next) => {
  const basicData = {
    topic: req.event.topic,
    deliveryAttempt: 1,
    deliveryState: false,
    eventId: req.event.id,
    affectedResource: req.event.affectedResource,
  };

  const payload = {
    ...req.event.payload,
    topic: basicData.topic,
    deliveryAttempt: basicData.deliveryAttempt,
    eventId: basicData.eventId,
    affectedResource: basicData.affectedResource,
  };

  basicData.payload = payload;

  console.log(`sending message to ${req.subscribers.length} subscriber(s)...`);

  req.subscribers.forEach(({ id, url }) => {
    const msgData = { ...basicData, url, subscriptionId: id };

    queue.push(msgData, (error) => {
      console.log("error while adding message to message queue");
      // handle later - what if pushing onto message queue fails?
    });
  });

  res.sendStatus(200);
};

exports.getMessages = getMessages;
exports.createMessages = createMessages;

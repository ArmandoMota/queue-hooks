const Message = require("../models/message");
const queue = require("./queueController");
const crypto = require("crypto");

const getMessages = (req, res, next) => {
  Message.find({})
    .then((msgs) => res.json({ msgs }))
    .catch((error) => console.log(error));
};

const createMessages = (req, res, next) => {
  console.log(`sending message to ${req.subscribers.length} subscriber(s)...`);
  const basicData = extractMsgData(req);

  req.subscribers.forEach(({ id, url, secret }) => {
    const msgData = { ...basicData, subscriptionId: id };
    Message.create(msgData)
      .then((msg) => (msgData.id = msg._id))
      .catch((error) => console.log(error));

    msgData.url = url;
    if (secret) {
      msgData.signature = calculateSignature(basicData.payload, secret);
    }

    queue.push(msgData, (error) => {
      console.log("error while adding message to message queue");
    });
  });

  res.sendStatus(200);
};

const extractMsgData = (req) => {
  const basicData = {
    topic: req.event.topic,
    deliveryAttempt: 1,
    deliveryState: false,
    eventId: req.event.id,
    affectedResource: req.event.affectedResource,
  };

  basicData.payload = {
    ...req.event.payload,
    topic: basicData.topic,
    deliveryAttempt: basicData.deliveryAttempt,
    eventId: basicData.eventId,
    affectedResource: basicData.affectedResource,
  };

  return basicData;
};

const calculateSignature = (payload, secret) => {
  const hmac = crypto.createHmac("sha256", secret);

  if (typeof payload !== "string") {
    payload = JSON.stringify(payload);
  }

  hmac.update(payload);
  return hmac.digest("hex");
};

exports.getMessages = getMessages;
exports.createMessages = createMessages;

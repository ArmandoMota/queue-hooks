const Message = require("../models/message");
const queue = require("./queueController");

const getMessages = (req, res, next) => {
  Message.find({})
    .then((msgs) => res.json({ msgs }))
    .catch((error) => console.log(error));
};

const createMessage = async (req, res, next) => {
  const msg = await Message.create(req.body);
  queue.push(msg, (error) => {
    console.log('error in adding "${msg.topic}" event to event queue');
  });
  res.sendStatus(200);
};

exports.getMessages = getMessages;
exports.createMessage = createMessage;

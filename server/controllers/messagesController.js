const axios = require ('axios');
const Message = require("../models/message");
const Subscription = require("../models/subscription");


const getMessages = (req, res, next) => {
  Message.find({})
    .then(msgs => res.json({ msgs }))
    .catch(error => console.log(error));
};

const sendMessage = async (req, res, next) => {
  try {
    const msg = await Message.create(req.body);
    const subs = await Subscription.find({});

    subs.forEach(({ url, listeningFor }) => {
      if (listeningFor.includes(msg.eventId)) {
        console.log(`notifying ${url} of event ${msg.eventId}`);
        // need to set up a queue instead of handling all message sending here
        axios.post(url, msg.payload)
          .then(response => {
            console.log(`${url} confirmed receipt of notification`);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  } catch(e) {
    console.log(e);
  }
};

exports.getMessages = getMessages;
exports.sendMessage = sendMessage;
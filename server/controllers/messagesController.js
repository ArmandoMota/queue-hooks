const axios = require("axios");
const Message = require("../models/message");
const Subscription = require("../models/subscription");

const async = require("async");
const q = async.queue(async (job) => {
  axios.post(job.url, job.data).then((response) => {
    console.log(`Sent message to ${job.url}. Status: ${response.status}`);
  });
});

const createMessage = (req, res, next) => {
  console.log("createMessage");
  Message.create(req.body)
    .then((msg) => {
      req.msg = msg;
      next();
    })
    .catch((error) => console.log(error));
};

const createTestMessage = (req, res, next) => {
  console.log("createTestMessage");

  const testMessage = {
    payload: {
      eventType: "Test Ping",
    },
  };

  Message.create(testMessage)
    .then((msg) => {
      req.msg = msg;
      next();
    })
    .catch((error) => console.log(error));
};

const findSubscriptions = (req, res, next) => {
  console.log("findSubs");
  req.subscribers = [];

  Subscription.find({})
    .then((subs) => {
      subs.forEach(({ url, listeningFor }) => {
        console.log(req.msg.eventId);
        if (listeningFor.includes(req.msg.eventId)) {
          req.subscribers.push(url);
        }
      });

      next();
    })
    .catch((error) => console.log(error));
};

const sendMessage = (req, res, next) => {
  console.log("sendMessage");
  console.log(req.body);
  req.subscribers.forEach((url) => {
    console.log(`notifying ${url} of event ${req.msg.eventId}`);

    axios
      .post(url, req.msg.payload)
      .then((response) => console.log(`confirmed receipt from ${url}`))
      .catch((error) => console.log(error));
  });
};

const sendTestMessage = (req, res, next) => {
  console.log("sendTestMessage");
  // req.msg is a mongoose object (document),
  // meaning you can invoke toJSON directly on it
  // to achieve the format defined in the schema.
  // This also is invoked by JSON.stringify,
  // and potentially res.json(),
  // so consider testing
  q.push({ url: req.sub.url, data: req.msg.payload });
  // console.log(req.msg.toJSON());

  next();
};

const getMessages = (req, res, next) => {
  Message.find({})
    .then((msgs) => res.json({ msgs }))
    .catch((error) => console.log(error));
};

exports.getMessages = getMessages;
exports.createMessage = createMessage;
exports.findSubscriptions = findSubscriptions;
exports.sendMessage = sendMessage;
exports.createTestMessage = createTestMessage;
exports.sendTestMessage = sendTestMessage;

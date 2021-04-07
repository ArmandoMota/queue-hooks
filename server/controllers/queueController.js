const axios = require("axios");
const Subscription = require("../models/subscription");
const priorityQueue = require("async/priorityQueue");
const Message = require("../models/message");

const postConfig = { headers: { "Content-Type": "application/json" } };
let queue;

const initializePriorityQueue = async () => {
  console.log("Initializing priority queue");
  queue = priorityQueue(worker, 10);
};

const push = (rawEvent, callback) => {
  queue.push(rawEvent, callback);
};

const worker = (msg, callback) => {
  const timeout = 2 ** msg.deliveryAttempt * 1000;

  setTimeout(() => {
    console.log(`sending message ${msg._id}`);

    axios
      .post(msg.url, msg.payload, postConfig)
      .then((response) => {
        handleSuccessfulDelivery(msg);
      })
      .catch((error) => {
        handleFailedDelivery(msg);
      });
  }, timeout);
};

const handleSuccessfulDelivery = async (msg) => {
  console.log(`consumer confirmed receipt of message ${msg._id}`);

  const updates = {
    latestDelivery: new Date(),
    deliveryState: true,
  };

  if (msg.deliveryAttempt === 1) {
    updates.firstDelivery = updates.latestDelivery;
  }

  await Message.findByIdAndUpdate(msg._id, updates, { new: true });
};

const handleFailedDelivery = (msg) => {
  console.log(`sending message ${msg._id} failed, trying again`);
  if (msg.deliveryAttempt === 5) {
    console.log(`Reached max of 5 retries for message ${msg._id}`);
    return;
  }

  const updates = {
    latestDelivery: new Date(),
    deliveryAttempt: msg.deliveryAttempt + 1,
  };

  Message.findByIdAndUpdate(msg._id, updates, { new: true })
    .then((updatedMsg) => {
      updatedMsg.url = msg.url;

      queue.push(updatedMsg, (error) => {
        console.log(
          "error while adding message ${msg._id} back into message queue"
        );
      });
    })
    .catch((error) => console.log(error));
};

exports.initializePriorityQueue = initializePriorityQueue;
exports.push = push;

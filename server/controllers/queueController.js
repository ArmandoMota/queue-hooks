const axios = require("axios");
const Subscription = require("../models/subscription");
const priorityQueue = require("async/priorityQueue");
const Message = require("../models/message");

const postConfig = { headers: { "Content-Type": "application/json" } };

let queue;

const initializePriorityQueue = () => {
  console.log("Initializing priority queue");
  queue = priorityQueue(worker, 10);
};

const push = (rawEvent, callback) => {
  queue.push(rawEvent, callback);
};

const pushCallback = (msgData) => {
  console.log(
    `error while adding message ${msgData.id || ""} back into message queue`
  );
};

const worker = (msgData, callback) => {
  const timeout = 2 ** msgData.deliveryAttempt * 1000;

  setTimeout(() => {
    axios
      .post(msgData.url, msgData.payload, postConfig)
      .then(() => handleSuccessfulDelivery(msgData))
      .catch(() => handleFailedDelivery(msgData));
  }, timeout);
};

const handleSuccessfulDelivery = (msgData) => {
  msgData.latestDelivery = new Date();
  msgData.deliveryState = true;

  if (msgData.deliveryAttempt === 1) {
    msgData.firstDelivery = msgData.latestDelivery;
  }

  const { url, ...validMsgData } = msgData;
  updateDatabaseOnSuccess(validMsgData);
};

const updateDatabaseOnSuccess = (msgData) => {
  if (msgData.deliveryAttempt === 1) {
    Message.create(msgData)
      .then((msg) => console.log(`message ${msg._id} confirmed received`))
      .catch((error) => console.log(error));
  } else {
    const props = {
      latestDelivery: msgData.latestDelivery,
      deliveryState: msgData.deliveryState,
    };

    Message.findByIdAndUpdate(msgData.id, props, { new: true })
      .then((msg) => console.log(`message ${msg._id} confirmed received`))
      .catch((error) => console.log(error));
  }
};

const handleFailedDelivery = (msgData) => {
  msgData.latestDelivery = new Date();
  msgData.deliveryAttempt = msgData.deliveryAttempt + 1;

  if (msgData.deliveryAttempt === 2) {
    msgData.firstDelivery = msgData.latestDelivery;
  }

  const { url, ...validMsgData } = msgData;
  updateDatabaseOnFail(validMsgData);
};

const updateDatabaseOnFail = (msgData) => {
  if (msgData.deliveryAttempt === 2) {
    Message.create(msgData)
      .then((msg) => {
        console.log(`message ${msg._id} failed, retrying...`);
        msgData.id = msg._id;
        queue.push(msgData, pushCallback);
      })
      .catch((error) => console.log(error));
  } else {
    const updates = { latestDelivery: msgData.latestDelivery };

    if (msgData.deliveryAttempt <= 5) {
      updates.deliveryAttempt = msgData.deliveryAttempt;
    }

    Message.findByIdAndUpdate(msgData.id, updates, { new: true })
      .then(() => {
        if (msgData.deliveryAttempt <= 5) {
          console.log(`message ${msgData.id} failed, retrying...`);
          queue.push(msgData, pushCallback);
        } else {
          console.log(
            `Reached max of 5 retries for message ${msgData.id}.  Ending retries.`
          );
        }
      })
      .catch((error) => console.log(error));
  }
};

exports.initializePriorityQueue = initializePriorityQueue;
exports.push = push;

const axios = require("axios");
const priorityQueue = require("async/priorityQueue");
const Message = require("../models/message");

const MAX_RETRY_ATTEMPTS = 5;

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

const calculateDelay = (msgData) => 2 ** msgData.deliveryAttempt * 1000;

const worker = (msgData, callback) => {
  msgData.payload.deliveryAttempt = msgData.deliveryAttempt;
  const timeout = calculateDelay(msgData);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Team4hook-EventId": msgData.topic,
    },
    timeout: 5000,
    maxRedirects: 0,
  };

  if (msgData.signature) {
    config.headers["X-Team4Hook-Signature"] = msgData.signature;
  }

  setTimeout(() => {
    axios
      .post(msgData.url, msgData.payload, config)
      .then((res) => handleSuccessfulDelivery(msgData, res))
      .catch((res) => handleFailedDelivery(msgData, res));
  }, timeout);
};

const handleSuccessfulDelivery = (msgData, res) => {
  const { url, ...validMsgData } = msgData;
  const { responseData, requestData } = extractRequestAndResponse(res);

  const newProps = {
    requestData,
    responseData,
    latestDelivery: new Date(),
    deliveryState: true,
  };

  updateDatabaseOnSuccess(validMsgData, newProps);
};

const updateDatabaseOnSuccess = (msgData, newProps) => {
  if (msgData.deliveryAttempt === 1) {
    msgData.firstDelivery = msgData.latestDelivery;
    msgData = { ...msgData, ...newProps };

    Message.create(msgData)
      .then((msg) => console.log(`message ${msg._id} confirmed received`))
      .catch((error) => console.log(error));
  } else {
    Message.findByIdAndUpdate(msgData.id, newProps, { new: true })
      .then((msg) => console.log(`message ${msg._id} confirmed received`))
      .catch((error) => console.log(error));
  }
};

const handleFailedDelivery = (msgData, res) => {
  const { request, ...response } = res;
  const { responseData, requestData } = extractRequestAndResponse(res);

  const newProps = {
    responseData,
    requestData,
    latestDelivery: new Date(),
    deliveryAttempt: msgData.deliveryAttempt + 1,
  };

  msgData = { ...msgData, ...newProps };
  updateDatabaseOnFail(msgData, newProps);
};

const updateDatabaseOnFail = (msgData, newProps) => {
  if (msgData.deliveryAttempt === 2) {
    msgData.firstDelivery = msgData.latestDelivery;
    createFailedMessage(msgData);
  } else {
    updateFailedMessage(msgData, newProps);
  }
};

const createFailedMessage = (msgData) => {
  const { url, ...validMsgData } = msgData;

  Message.create(validMsgData)
    .then((msg) => {
      console.log(`message ${msg._id} failed, retrying...`);
      msgData.id = msg._id;
      queue.push(msgData, pushCallback);
    })
    .catch((error) => console.log(error));
};

const updateFailedMessage = (msgData, newProps) => {
  if (newProps.deliveryAttempt > MAX_RETRY_ATTEMPTS) {
    delete newProps.deliveryAttempt;
  }

  Message.findByIdAndUpdate(msgData.id, newProps, { new: true })
    .then(() => {
      if (msgData.deliveryAttempt <= MAX_RETRY_ATTEMPTS) {
        console.log(`message ${msgData.id} failed, retrying...`);
        queue.push(msgData, pushCallback);
      } else {
        console.log(
          `Reached max of 5 retries for message ${msgData.id}.  Ending retries.`
        );
      }
    })
    .catch((error) => console.log(error));
};

const extractRequestAndResponse = (res) => {
  const requestData = res.config;
  const responseData = {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
    data: res.data,
  };

  return { responseData, requestData };
};

exports.initializePriorityQueue = initializePriorityQueue;
exports.push = push;

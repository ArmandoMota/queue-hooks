const axios = require("axios");
const priorityQueue = require("async/priorityQueue");
const Message = require("../models/message");

const MAX_RETRY_ATTEMPTS = 5;
const POST_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  maxRedirects: 0,
};

let queue;

const initializePriorityQueue = () => {
  console.log("Initializing priority queue");
  queue = priorityQueue(worker, 10);
};

const push = (rawEvent, callback) => {
  queue.push(rawEvent, callback);
};

const worker = async (msgData, callback) => {
  if (msgData.deliveryAttempt === 1) {
    const { url, signature, ...validData } = msgData;
    const msgObject = await Message.create(validData);
    msgData.id = msgObject._id;
  }

  const timeout = calculateDelay(msgData);
  setTimeout(() => sendMessage(msgData), timeout);
};

const sendMessage = (msgData) => {
  const config = { ...POST_CONFIG };
  config.headers["X-Team4hook-EventId"] = msgData.topic;

  if (msgData.signature) {
    config.headers["X-Team4Hook-Signature"] = msgData.signature;
  }

  console.log(`Sending message ${msgData.id}...`);
  axios
    .post(msgData.url, msgData.payload, config)
    .then((res) => handleSuccessfulDelivery(msgData, res))
    .catch((res) => handleFailedDelivery(msgData, res));
};

const handleSuccessfulDelivery = (msgData, res) => {
  const { responseData, requestData } = extractRequestAndResponse(res);
  const newProps = {
    requestData,
    responseData,
    latestDelivery: new Date(),
    deliveryState: true,
  };

  console.log(`Message ${msgData.id} confirmed received`);
  updateDatabaseOnSuccess(msgData, newProps);
};

const updateDatabaseOnSuccess = async (msgData, newProps) => {
  if (msgData.deliveryAttempt === 1) {
    newProps.firstDelivery = newProps.latestDelivery;
  }

  await Message.findByIdAndUpdate(msgData.id, newProps, { new: true });
};

const handleFailedDelivery = (msgData, res) => {
  const { responseData, requestData } = extractRequestAndResponse(res);
  const newProps = {
    responseData,
    requestData,
    latestDelivery: new Date(),
    deliveryAttempt: msgData.deliveryAttempt + 1,
    payload: {
      ...msgData.payload,
      deliveryAttempt: msgData.deliveryAttempt + 1,
    },
  };

  if (msgData.deliveryAttempt < MAX_RETRY_ATTEMPTS) {
    console.log(`Message ${msgData.id} failed, retrying...`);
  } else {
    console.log(`Reached max of 5 retries for message ${msgData.id}.`);
  }

  updateDatabaseOnFail(msgData, newProps);
};

const updateDatabaseOnFail = async (msgData, newProps) => {
  if (msgData.deliveryAttempt === 1) {
    newProps.firstDelivery = newProps.latestDelivery;
  } else if (msgData.deliveryAttempt === MAX_RETRY_ATTEMPTS) {
    delete newProps.deliveryAttempt;
    delete newProps.payload;
  }

  await Message.findByIdAndUpdate(msgData.id, newProps, { new: true });

  if (msgData.deliveryAttempt < MAX_RETRY_ATTEMPTS) {
    msgData = { ...msgData, ...newProps };
    queue.push(msgData, pushCallback);
  }
};

const pushCallback = (msgData) => {
  console.log(
    `error while adding message ${msgData.id || ""} back into message queue`
  );
};

const calculateDelay = (msgData) => 2 ** msgData.deliveryAttempt * 1000;

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

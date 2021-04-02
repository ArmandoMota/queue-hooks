const axios = require("axios");
const Subscription = require("../models/subscription");
const priorityQueue = require("async/priorityQueue");

const postConfig = { headers: { "Content-Type": "application/json" } };
let queue;

const initializePriorityQueue = async () => {
  console.log("Initializing priority queue");
  queue = priorityQueue(worker, 10);
};

const worker = async (msg, callback) => {
  const subscribers = await getSubscribers(msg.topic);
  subscribers.forEach((url) => {
    console.log(`notifying subscriber \"${url}\" of event \"${msg.topic}\"`);

    axios
      .post(url, msg.payload, postConfig)
      .then((response) => {
        // if this is the first delivery attempt, add First-Delivery of event object
        // add/update Latest-Delivery of event object
        // change Delivery-State to true on event object
        // put event into event history
        console.log(`confirmed receipt from subscriber \"${url}\"`);
      })
      .catch((error) => {
        // modify Latest-Delivery of event object
        // increment Delivery-Attempt of event object
        // set a timeout to handle exponential backoff?
        // push back into queue
        console.log(error);
      });
  });
};

const getSubscribers = async (topic) => {
  const allSubscriptions = await Subscription.find({});
  const validSubscriptions = allSubscriptions.filter((subscription) => {
    return subscription.topics.includes(topic);
  });

  return validSubscriptions.map(({ url }) => url);
};

const push = (rawEvent, callback) => {
  queue.push(rawEvent, callback);
};

exports.initializePriorityQueue = initializePriorityQueue;
exports.push = push;

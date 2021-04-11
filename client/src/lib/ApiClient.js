import axios from "axios";

const unwrapData = (response) => response.data;

const getEvents = (callback) => {
  axios
    .get("/api/v1/events")
    .then(unwrapData)
    .then(callback)
    .catch((error) => console.log(error));
};

const getSubscriptions = (callback) => {
  axios
    .get("/api/v1/subs")
    .then(unwrapData)
    .then(callback)
    .catch((error) => console.log(error));
};

const addSubscription = (newSubscription, callback) => {
  axios
    .post("/api/v1/subs", newSubscription)
    .then(unwrapData)
    .then(({ sub }) => callback(sub))
    .catch((error) => console.log(error));
};

const deleteSubscription = (subId, callback) => {
  const subEndpoint = `/api/v1/subs/${subId}`;

  axios
    .delete(subEndpoint)
    .then(unwrapData)
    .then(callback)
    .catch((error) => console.log(error));
};

const sendMessage = (eventId, payload) => {
  const msgInfo = { eventId, payload };

  axios
    .post("/api/v1/msgs", msgInfo)
    .then(unwrapData)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

export default {
  getSubscriptions,
  addSubscription,
  deleteSubscription,
  sendMessage,
  getEvents,
};

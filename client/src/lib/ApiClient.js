import axios from "axios";

const unwrapData = (response) => response.data;

const getSubscriptions = (setSubscriptions) => {
  axios
    .get("/api/v1/subs")
    .then(unwrapData)
    .then(({ subs }) => setSubscriptions(subs))
    .catch((error) => console.log(error));
};

const addSubscription = (newSubscription, callback) => {
  axios
    .post("/api/v1/subs", newSubscription)
    .then(unwrapData)
    .then(({ sub }) => callback(sub))
    .catch((error) => console.log(error));
};

const notifySubscribers = (newEvent) => {
  axios
    .post("/api/v1/msgs", newEvent)
    .then(unwrapData)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

export default { getSubscriptions, addSubscription, notifySubscribers };

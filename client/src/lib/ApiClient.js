import axios from 'axios';

const unwrapData = (response) => response.data;

const getSubscriptions = (setSubscriptions) => {
  axios.get('/api/v1/subs')
    .then(unwrapData)
    .then(({ subs }) => setSubscriptions(subs))
    .catch(error => console.log(error));
};

const addSubscription = (newSubscription, callback) => {
  axios.post('/api/v1/subs', newSubscription)
    .then(unwrapData)
    .then(({ sub }) => callback(sub))
    .catch(error => console.log(error));
};

const sendHook = (eventId) => {
  axios.post('/api/v1/msgs')
    .then(unwrapData)
    .then(data => console.log(data))
    .catch(error => console.log(error));

  // endpoints.forEach(({ url, subscribedTo }) => {
  //   if (subscribedTo.includes(eventType)) {
  //     console.log(`sending hook to ${url} for event ${eventType}`);
  //     const payload = JSON.stringify({ data: `Event ${eventType} occurred!`});

  //     axios.post(url, payload)
  //       .then(response => {
  //         console.log(response.data);
  //         console.log(response.status);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // });
};

export default { getSubscriptions, addSubscription, sendHook };
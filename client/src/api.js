import axios from 'axios';

const endpoints = [];
// const endpoints = [
//   {url: "https://armandomota.com/api/v1/bins/0534d83b", subscribedTo: ["1", "2", "4"]},
//   {url: "https://armandomota.com/api/v1/bins/0bca7e68", subscribedTo: ["1", "3"]},
// ];

const getRegisteredEndpoints = () => {
  return [...endpoints];
};

const addNewEndpoint = (newEndpoint) => {
  console.log('adding new');
  if (!endpoints.find(endpoint => endpoint.url === newEndpoint.url)) {
    endpoints.push(newEndpoint);
    console.log(endpoints);
  };
};

const sendHook = (eventType) => {
  endpoints.forEach(({ url, subscribedTo }) => {
    if (subscribedTo.includes(eventType)) {
      console.log(`sending hook to ${url} for event ${eventType}`);
      const payload = JSON.stringify({ data: `Event ${eventType} occurred!`});

      axios.post(url, payload)
        .then(response => {
          console.log(response.data);
          console.log(response.status);
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
};

export default { getRegisteredEndpoints, addNewEndpoint, sendHook };
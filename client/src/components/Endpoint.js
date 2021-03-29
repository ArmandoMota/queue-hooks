import react from 'react';

const Endpoint = ({ url, subscribedTo }) => {
  const eventString = subscribedTo.join(', ');

  return (
    <li>
      <div htmlclass="url">
        <h3>Url:</h3>
        <p>{url}</p>
      </div>
      <div htmlclass="events-followed">
        <h3>Events subscribed to:</h3>
        <p>{eventString}</p>
      </div>
    </li>
  );
};

export default Endpoint;
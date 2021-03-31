import React from 'react';

const Subscription = ({ sub }) => {
  const subNames = sub.listeningFor.map(event => event.description);
  const eventString = subNames.join(', ') || '';

  return (
    <li>
      <div htmlclass="url">
        <h3>Url:</h3>
        <p>{sub.url}</p>
      </div>
      <div htmlclass="events-followed">
        <h3>Events subscribed to:</h3>
        <p>{eventString}</p>
      </div>
    </li>
  );
};

export default Subscription;
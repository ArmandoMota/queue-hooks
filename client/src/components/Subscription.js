import React from "react";

const Subscription = ({ sub }) => {
  const eventTypes = sub.event_types.map((eventType) => eventType.description);
  const eventString = eventTypes.join(", ") || "";

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

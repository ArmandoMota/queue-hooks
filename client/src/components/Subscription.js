import React from "react";

const Subscription = ({ sub }) => {
  const subNames = sub.listeningFor.map((event) => event.description);
  const eventString = subNames.join(", ") || "";

  return (
    <li>
      <div className="url">
        <h3>Url:</h3>
        <p>{sub.url}</p>
      </div>
      <div className="events-followed">
        <h3>Events subscribed to:</h3>
        <p>{eventString}</p>
      </div>
    </li>
  );
};

export default Subscription;

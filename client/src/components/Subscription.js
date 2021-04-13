import React from "react";
import api from "../lib/ApiClient";

const Subscription = ({ sub, removeSubscription }) => {
  const eventTypes = sub.event_types.map((eventType) => eventType.description);
  const eventString = eventTypes.join(", ") || "";

  const handleDelete = () => {
    api.deleteSubscription(sub.app_id, sub.id, removeSubscription);
  };

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
      <div>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Subscription;

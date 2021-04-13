import React from "react";
import api from "../lib/ApiClient";

const Subscription = ({ sub, removeSubscription }) => {
  const eventTypes = sub.event_types.map((eventType) => eventType.description);
  const eventString = eventTypes.join(", ") || "";

  const handleDelete = () => {
    api.deleteSubscription(sub.app_id, sub.id, removeSubscription);
  };

  return (
    <li className="subscription-container">
      <div className="subscription-details">
        <ul className="subscription-details-container">
          <li>
            <h3>Url:</h3>
            <p>{sub.url}</p>
          </li>
          <li>
            <h3>Subscribed to:</h3>
            <p>{eventString}</p>
          </li>
        </ul>
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

import React from "react";
import api from "../lib/ApiClient";

const TriggerEvents = ({ eventTypes, app_id }) => {
  const handleNewHook = (e) => {
    e.preventDefault();
    const newEvent = {
      app_id,
      event_type: e.target.value,
      affected_resource: e.target.name,
      payload: {
        msg:
          "Custom payload for this event, specified by the customer.  Could be any JSON object",
      },
    };

    api.notifySubscribers(app_id, newEvent);
  };

  if (eventTypes.length === 0) {
    return null;
  }

  return (
    <div id="hook-button-container">
      <h2>Trigger an event by pressing a button below:</h2>
      <ul id="event-creation-list">
        {eventTypes.map((eventType) => (
          <li>
            <button
              type="button"
              name={eventType.description}
              onClick={handleNewHook}
              value={eventType.id}
            >
              {eventType.description}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TriggerEvents;

import React from "react";
import api from "../lib/ApiClient";

const TriggerEvents = ({ topics }) => {
  const handleNewHook = (e) => {
    e.preventDefault();
    const newEvent = {
      topic: e.target.value,
      affectedResource: e.target.name,
      payload: {
        msg: "Custom message for this event, specified by our customer",
      },
    };

    api.notifySubscribers(newEvent);
  };

  if (topics.length === 0) {
    return null;
  }

  return (
    <div id="hook-button-container">
      <h2>Trigger an event by pressing a button below:</h2>
      <ul id="event-creation-list">
        {topics.map((topic) => (
          <li>
            <button
              type="button"
              name={topic.name}
              onClick={handleNewHook}
              value={topic.id}
            >
              {topic.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TriggerEvents;

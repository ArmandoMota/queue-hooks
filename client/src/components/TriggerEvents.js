import React from "react";
import api from "../lib/ApiClient";

const TriggerEvents = () => {
  const handleNewHook = (e) => {
    e.preventDefault();
    const newEvent = {
      topic: e.target.value,
      affectedResource: e.target.name,
      payload: { msg: `Button "${e.target.name}" was pressed.` },
    };

    api.notifySubscribers(newEvent);
  };

  return (
    <div id="hook-button-container">
      <h2>Trigger an event by pressing a button below:</h2>
      <ul id="event-creation-list">
        <li>
          <button
            type="button"
            name="Event 1 button pressed"
            onClick={handleNewHook}
            value="606685fbc0e76992736a8903"
          >
            Event 1
          </button>
        </li>
        <li>
          <button
            type="button"
            name="Event 2 button pressed"
            onClick={handleNewHook}
            value="6066863fc0e76992736a8904"
          >
            Event 2
          </button>
        </li>
        <li>
          <button
            type="button"
            name="Event 3 button pressed"
            onClick={handleNewHook}
            value="60668643c0e76992736a8905"
          >
            Event 3
          </button>
        </li>
        <li>
          <button
            type="button"
            name="Event 4 button pressed"
            onClick={handleNewHook}
            value="60668646c0e76992736a8906"
          >
            Event 4
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TriggerEvents;

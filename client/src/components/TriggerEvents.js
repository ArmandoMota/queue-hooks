import React from 'react';
import api from '../lib/ApiClient';

const TriggerEvents = () => {
  
  const handleNewHook = (e) => {
    e.preventDefault();
    const eventId = e.target.value;
    const payload = {
      type: e.target.name,
      msg: `${e.target.name} was triggered`,
    };
    api.sendMessage(eventId, payload);
  };

  return (
    <div id="hook-button-container">
      <h2>Trigger an event by pressing a button below:</h2>
      <ul id="event-creation-list">
        <li>
          <button type="button" name="Button 1" onClick={handleNewHook}
            value="6063c2a4d0eda700b38638ae">Event 1</button>
        </li>
        <li>
          <button type="button" name="Button 2" onClick={handleNewHook}
            value="6063c38fbca40e010c6e0d6a">Event 2</button>
        </li>
        <li>
          <button type="button" name="Button 3" onClick={handleNewHook}
            value="6063c3caab1a100140cda4c8">Event 3</button>
        </li>
        <li>
          <button type="button" name="Button 4" onClick={handleNewHook}
            value="6063c3ceab1a100140cda4c9">Event 4</button>
        </li>
      </ul>
    </div>
  );
};

export default TriggerEvents;
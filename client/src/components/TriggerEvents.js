import React from 'react';

const TriggerEvents = ({ onNewHook }) => {
  return (
    <div id="hook-button-container">
      <h2>Trigger an event by pressing a button below:</h2>
      <ul id="event-creation-list">
        <li>
          <button type="button" name="button1" onClick={onNewHook}
            value="6063c2a4d0eda700b38638ae">Event 1</button>
        </li>
        <li>
          <button type="button" name="button2" onClick={onNewHook}
            value="6063c38fbca40e010c6e0d6a">Event 2</button>
        </li>
        <li>
          <button type="button" name="button3" onClick={onNewHook}
            value="6063c3caab1a100140cda4c8">Event 3</button>
        </li>
        <li>
          <button type="button" name="button4" onClick={onNewHook}
            value="6063c3ceab1a100140cda4c9">Event 4</button>
        </li>
      </ul>
    </div>
  );
};

export default TriggerEvents;
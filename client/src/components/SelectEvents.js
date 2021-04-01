import React from 'react';
import api from '../lib/ApiClient';

const SelectEvents = ({ addToSubscriptions }) => {
  const handleNewSubscription = (e) => {
    e.preventDefault();
    const parentForm = e.target;
    const formInputs = Array.from(parentForm.elements);
    const newSubscription = { listeningFor: [] };

    formInputs.forEach(element => {
      if (element.type === "text") {
        newSubscription.url = element.value;
      } else if (element.type === "checkbox" && element.checked)  {
        newSubscription.listeningFor.push(element.value)
      }
    });
    
    api.addSubscription(newSubscription, newSub => addToSubscriptions(newSub));
    parentForm.reset();
  };


  return (
    <div id="register-endpoint-container">
      <h2>Register Subscription</h2>
      <form id="register-endpoint-form" onSubmit={handleNewSubscription}>
        <h3>Enter the endpoint you'd like us to send event notifications to:</h3>
        <input type="text" id="endpoint" name="endpoint" 
          placeholder="https://yourwebsite.com/yourendpoint"/>
        <h3>Select which events you'd like us to notify you about:</h3>
        <ul id="event-selection-list">
          <li>
            <label>Event 1
              <input type="checkbox" name="event1-checkbox"
                value="6063c2a4d0eda700b38638ae"/>
            </label>
          </li>
          <li>
            <label>Event 2
              <input type="checkbox" name="event2-checkbox"
                value="6063c38fbca40e010c6e0d6a"/>
            </label>
          </li>
          <li>
            <label>Event 3
              <input type="checkbox" name="event3-checkbox"
                value="6063c3caab1a100140cda4c8"/>
            </label>
          </li>
          <li>
            <label>Event 4
              <input type="checkbox" name="event4-checkbox"
                value="6063c3ceab1a100140cda4c9"/>
            </label>
          </li>
        </ul>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
};

export default SelectEvents;
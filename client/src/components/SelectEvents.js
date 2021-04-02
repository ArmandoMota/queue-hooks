import React from "react";
import api from "../lib/ApiClient";

const SelectEvents = ({ addToSubscriptions }) => {
  const handleNewSubscription = (e) => {
    e.preventDefault();
    const parentForm = e.target;
    const formInputs = Array.from(parentForm.elements);
    const newSubscription = { topics: [] };

    formInputs.forEach((element) => {
      if (element.type === "text") {
        newSubscription.url = element.value;
      } else if (element.type === "checkbox" && element.checked) {
        newSubscription.topics.push(element.value);
      }
    });

    api.addSubscription(newSubscription, (newSub) =>
      addToSubscriptions(newSub)
    );
    parentForm.reset();
  };

  return (
    <div id="register-endpoint-container">
      <h2>Register Subscription</h2>
      <form id="register-endpoint-form" onSubmit={handleNewSubscription}>
        <h3>
          Enter the endpoint you'd like us to send event notifications to:
        </h3>
        <input
          type="text"
          id="endpoint"
          name="endpoint"
          placeholder="https://yourwebsite.com/yourendpoint"
        />
        <h3>Select which events you'd like us to notify you about:</h3>
        <ul id="event-selection-list">
          <li>
            <label>
              Event 1
              <input
                type="checkbox"
                name="event1-checkbox"
                value="606685fbc0e76992736a8903"
              />
            </label>
          </li>
          <li>
            <label>
              Event 2
              <input
                type="checkbox"
                name="event2-checkbox"
                value="6066863fc0e76992736a8904"
              />
            </label>
          </li>
          <li>
            <label>
              Event 3
              <input
                type="checkbox"
                name="event3-checkbox"
                value="60668643c0e76992736a8905"
              />
            </label>
          </li>
          <li>
            <label>
              Event 4
              <input
                type="checkbox"
                name="event4-checkbox"
                value="60668646c0e76992736a8906"
              />
            </label>
          </li>
        </ul>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SelectEvents;

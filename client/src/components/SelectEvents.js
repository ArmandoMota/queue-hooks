import React from "react";
import api from "../lib/ApiClient";

const SelectEvents = ({ addToSubscriptions, topics }) => {
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
          {topics.map((topic) => (
            <li>
              <label>
                {topic.name}
                <input type="checkbox" name={topic.name} value={topic.id} />
              </label>
            </li>
          ))}
        </ul>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SelectEvents;

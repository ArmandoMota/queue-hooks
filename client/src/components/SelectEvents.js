import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSub } from "../actions/subActions";
import api from "../lib/ApiClient";

const SelectEvents = ({ addToSubscriptions }) => {
  const [endpointUrl, setEndpointUrl] = useState("");
  const dispatch = useDispatch();
  const handleNewSubscription = (e) => {
    e.preventDefault();
    const parentForm = e.target;
    const formInputs = Array.from(parentForm.elements);
    const newSubscription = { url: endpointUrl, listeningFor: [] };

    formInputs.forEach((element) => {
      if (element.name === "retry_automatically" && element.checked) {
        newSubscription.automaticRetries = true;
      } else if (element.type === "checkbox" && element.checked) {
        newSubscription.listeningFor.push(element.value);
      }
    });

    dispatch(createSub(newSubscription, () => setEndpointUrl("")));

    parentForm.reset();
  };

  return (
    <div id="register-endpoint-container">
      <h2>New Subscription</h2>
      <form id="register-endpoint-form" onSubmit={handleNewSubscription}>
        <h3>
          Enter the endpoint you'd like us to send event notifications to:
        </h3>
        <input
          type="text"
          id="endpoint"
          name="endpoint"
          value={endpointUrl}
          onChange={(e) => setEndpointUrl(e.target.value)}
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
                value="6066490329bf119338d0c1e2"
              />
            </label>
          </li>
          <li>
            <label>
              Event 2
              <input
                type="checkbox"
                name="event2-checkbox"
                value="6066490629bf119338d0c1e3"
              />
            </label>
          </li>
          <li>
            <label>
              Event 3
              <input
                type="checkbox"
                name="event3-checkbox"
                value="6066490829bf119338d0c1e4"
              />
            </label>
          </li>
          <li>
            <label>
              Event 4
              <input
                type="checkbox"
                name="event4-checkbox"
                value="6066490b29bf119338d0c1e5"
              />
            </label>
          </li>
        </ul>
        <h3>Optional Settings</h3>
        <ul>
          <li>
            <label>
              Enable automatic retries
              <input type="checkbox" name="retry_automatically" />
            </label>
          </li>
        </ul>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SelectEvents;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSub } from "../actions/subActions";
import EventSelectOptions from "./EventSelectOptions";

const NewSubscriptionForm = ({ addToSubscriptions }) => {
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
        <EventSelectOptions />
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

export default NewSubscriptionForm;

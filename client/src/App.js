import React from "react";
import "./App.css";
import api from "./lib/ApiClient";
import { useEffect, useState } from "react";
import TriggerEvents from "./components/TriggerEvents";
import SelectEvents from "./components/SelectEvents";
import Subscriptions from "./components/Subscriptions";

// this is hard-coded for testing
const APP_ID = "6074c0d2f8bc834cf9fb5729";

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    api.getSubscriptions(APP_ID, setSubscriptions);
  }, []);

  useEffect(() => {
    api.getEventTypes(APP_ID, setEventTypes);
  }, []);

  const addToSubscriptions = (newSubscription) => {
    setSubscriptions([...subscriptions, newSubscription]);
  };

  return (
    <>
      <TriggerEvents eventTypes={eventTypes} app_id={APP_ID} />
      <SelectEvents
        addToSubscriptions={addToSubscriptions}
        eventTypes={eventTypes}
        app_id={APP_ID}
      />
      <Subscriptions subscriptions={subscriptions} />
    </>
  );
}

export default App;

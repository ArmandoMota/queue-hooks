import React from "react";
import "./App.css";
import api from "./lib/ApiClient";
import { useEffect, useState } from "react";
import TriggerEvents from "./components/TriggerEvents";
import SelectEvents from "./components/SelectEvents";
import Subscriptions from "./components/Subscriptions";

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.getSubscriptions(setSubscriptions);
  }, []);

  useEffect(() => {
    api.getTopics(setTopics);
  }, []);

  const addToSubscriptions = (newSubscription) => {
    setSubscriptions([...subscriptions, newSubscription]);
  };

  return (
    <>
      <TriggerEvents topics={topics} />
      <SelectEvents addToSubscriptions={addToSubscriptions} topics={topics} />
      <Subscriptions subscriptions={subscriptions} />
    </>
  );
}

export default App;

import React from "react";
import "./App.css";
// import api from "./lib/ApiClient";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSubs } from "./actions/subActions";
import TriggerEvents from "./components/TriggerEvents";
import SelectEvents from "./components/SelectEvents";
import Subscriptions from "./components/Subscriptions";

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubs());
    // api.getSubscriptions(setSubscriptions);
  }, [dispatch]);

  const addToSubscriptions = (newSubscription) => {
    setSubscriptions([...subscriptions, newSubscription]);
  };

  return (
    <>
      <TriggerEvents />
      <SelectEvents addToSubscriptions={addToSubscriptions} />
      <Subscriptions subscriptions={subscriptions} />
    </>
  );
}

export default App;

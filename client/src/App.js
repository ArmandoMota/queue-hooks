import React from "react";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubs } from "./actions/subActions";
import TriggerEvents from "./components/TriggerEvents";
import SelectEvents from "./components/SelectEvents";
import Subscriptions from "./components/Subscriptions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubs());
  }, [dispatch]);

  return (
    <>
      <TriggerEvents />
      <SelectEvents />
      <Subscriptions />
    </>
  );
}

export default App;

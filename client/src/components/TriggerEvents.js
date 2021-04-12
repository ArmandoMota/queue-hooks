import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../actions/eventActions";
import api from "../lib/ApiClient";
import EventOptions from "./EventOptions";

const TriggerEvents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const events = useSelector((state) => state.events);

  const handleNewHook = (e) => {
    e.preventDefault();

    const eventId = e.target.value;
    const payload = {
      type: e.target.name,
      msg: `${e.target.name} was triggered`,
    };

    api.sendMessage(eventId, payload);
  };

  if (!events) {
    return null;
  }

  return (
    <div id="hook-button-container">
      <h2>Trigger an event by pressing a button below:</h2>
      <EventOptions events={events} handleNewHook={handleNewHook} />
    </div>
  );
};

export default TriggerEvents;

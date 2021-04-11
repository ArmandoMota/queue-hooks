import React from "react";
import { useSelector } from "react-redux";
import EventSelectOption from "./EventSelectOption";

const EventSelectOptions = ({ event }) => {
  const events = useSelector((state) => state.events);

  if (!events) {
    return null;
  }

  return (
    <>
      <h3>Select which events you'd like us to notify you about:</h3>
      <ul id="event-selection-list">
        {events.map((event) => (
          <EventSelectOption key={event.id} event={event} />
        ))}
      </ul>
    </>
  );
};

export default EventSelectOptions;

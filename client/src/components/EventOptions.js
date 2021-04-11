import React from "react";
import EventOption from "./EventOption";

const EventOptions = ({ events, handleNewHook }) => {
  return (
    <ul id="event-creation-list">
      {events.map((event, index) => (
        <EventOption
          key={event.id}
          event={event}
          index={index}
          handleClick={handleNewHook}
        />
      ))}
    </ul>
  );
};

export default EventOptions;

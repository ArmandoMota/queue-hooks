import React from "react";

const EventOption = ({ event, index, handleClick }) => {
  return (
    <li>
      <button
        type="button"
        name={event.description}
        onClick={handleClick}
        value={event.id}
      >
        {event.description}
      </button>
    </li>
  );
};

export default EventOption;

import React from "react";

const EventSelectOption = ({ event }) => {
  return (
    <li>
      <label>
        {event.description}
        <input type="checkbox" name={event.description} value={event.id} />
      </label>
    </li>
  );
};

export default EventSelectOption;

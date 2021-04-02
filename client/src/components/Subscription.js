import React from "react";

const Subscription = ({ sub }) => {
  const topicNames = sub.topics.map((topic) => topic.name);
  const eventString = topicNames.join(", ") || "";

  return (
    <li>
      <div htmlclass="url">
        <h3>Url:</h3>
        <p>{sub.url}</p>
      </div>
      <div htmlclass="events-followed">
        <h3>Events subscribed to:</h3>
        <p>{eventString}</p>
      </div>
    </li>
  );
};

export default Subscription;

import React from "react";
import Subscription from "./Subscription";

const Subscriptions = ({ subscriptions, removeSubscription }) => {
  return (
    <div id="existing-endpoint-container">
      <h2>Registered Subscriptions</h2>
      <ul>
        {subscriptions.map((sub) => (
          <Subscription
            key={sub.id}
            sub={sub}
            removeSubscription={removeSubscription}
          />
        ))}
      </ul>
    </div>
  );
};

export default Subscriptions;

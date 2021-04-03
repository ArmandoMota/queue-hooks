import React from "react";
import { useSelector } from "react-redux";
import Subscription from "./Subscription";

const Subscriptions = () => {
  const subscriptions = useSelector((state) => state.subs);

  return (
    <div id="existing-endpoint-container">
      <h2>Registered Subscriptions</h2>
      <ul>
        {subscriptions.map((sub) => (
          <Subscription key={sub.id} sub={sub} />
        ))}
      </ul>
    </div>
  );
};

export default Subscriptions;

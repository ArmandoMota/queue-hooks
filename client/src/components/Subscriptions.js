import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Subscription from "./Subscription";
import { deleteSub } from "../actions/subActions";

const Subscriptions = () => {
  const subscriptions = useSelector((state) => state.subs);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(deleteSub(id));
  };

  if (!subscriptions) {
    return null;
  }

  return (
    <div id="existing-endpoint-container">
      <h2>Registered Subscriptions</h2>
      <ul>
        {subscriptions.map((sub) => (
          <Subscription
            key={sub.id}
            sub={sub}
            handleClick={() => handleClick(sub.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Subscriptions;

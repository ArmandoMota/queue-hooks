import React from 'react';
import api from './lib/ApiClient';
import { useEffect, useState } from 'react';
import './App.css';

import TriggerEvents from './components/TriggerEvents';
import SelectEvents from './components/SelectEvents';
import Subscriptions from './components/Subscriptions';

function App() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    api.getSubscriptions(setSubscriptions);
  }, []);

  const handleNewHook = (e) => {
    e.preventDefault();
    api.sendHook(e.target.value);
  };

  const handleNewSubscription = (e) => {
    e.preventDefault();
    const parentForm = e.target;
    const newSubscription = { listeningFor: [] };

    Array.from(parentForm.elements).forEach(element => {
      if (element.type === "text") {
        newSubscription.url = element.value;
      } else if (element.type === "checkbox" && element.checked)  {
        newSubscription.listeningFor.push(element.value)
      }
    });
    
    api.addSubscription(newSubscription, newSub => {
      const updatedSubscriptions = [...subscriptions];
      updatedSubscriptions.push(newSub);
      setSubscriptions(updatedSubscriptions);
    });
    // api.getSubscriptions(setSubscriptions);
    parentForm.reset();
  };

  return (
    <>
      <TriggerEvents onNewHook={handleNewHook} />
      <SelectEvents onNewSubscription={handleNewSubscription} />
      <Subscriptions subscriptions={subscriptions} />
    </>
  );
}

export default App;

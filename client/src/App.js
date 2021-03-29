import './App.css';
import Endpoint from './components/Endpoint';
import api from './api';
import { useEffect, useState } from 'react';

function App() {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    setEndpoints(api.getRegisteredEndpoints());
  }, []);

  const handleNewHook = (e) => {
    e.preventDefault();
    api.sendHook(e.target.value);
  };

  const handleNewEndpoint = (e) => {
    e.preventDefault();
    const parentForm = e.target;
    const newEndpoint = { subscribedTo: [] };

    Array.from(parentForm.elements).forEach(element => {
      console.log(element.type);
      if (element.type === "text") {
        newEndpoint["url"] = element.value;
      } else if (element.type === "checkbox" && element.checked)  {
        newEndpoint["subscribedTo"].push(element.value)
      }
    })
    
    api.addNewEndpoint(newEndpoint);
    setEndpoints(api.getRegisteredEndpoints());
    parentForm.reset();
  };

  return (
    <>
      <div id="hook-button-container">
        <h2>Trigger an event by pressing a button below:</h2>
        <ul id="event-creation-list">
          <li><button type="button" name="button1" onClick={handleNewHook} value="1">Event 1</button></li>
          <li><button type="submit" name="button2" onClick={handleNewHook} value="2">Event 2</button></li>
          <li><button type="submit" name="button3" onClick={handleNewHook} value="3">Event 3</button></li>
          <li><button type="submit" name="button4" onClick={handleNewHook} value="4">Event 4</button></li>
        </ul>
      </div>
      
      <div id="register-endpoint-container">
        <h2>Register Endpoint</h2>
        <form id="register-endpoint-form" onSubmit={handleNewEndpoint}>
          <h3>Enter the endpoint you'd like us to send webhooks to:</h3>
          <input type="text" id="endpoint" name="endpoint" 
            placeholder="https://yourwebsite.com/yourendpoint"/>
          <h3>Select which events you'd like to subscribe to:</h3>
          <ul id="event-selection-list">
            <li>
              <label>Event 1
                <input type="checkbox" name="event1-checkbox" value="1"/>
              </label>
            </li>
            <li>
              <label>Event 2
                <input type="checkbox" name="event2-checkbox" value="2"/>
              </label>
            </li>
            <li>
              <label>Event 3
                <input type="checkbox" name="event3-checkbox" value="3"/>
              </label>
            </li>
            <li>
              <label>Event 4
                <input type="checkbox" name="event4-checkbox" value="4"/>
              </label>
            </li>
          </ul>
          <input type="submit" value="Create Endpoint"/>
        </form>
      </div>

      <div id="existing-endpoint-container">
        <h2>Registered Endpoints</h2>
          <ul>
            {endpoints.map(endpoint => <Endpoint key={endpoint.url} url={endpoint.url}
              subscribedTo={endpoint.subscribedTo}/>)}
          </ul>
      </div>
    </>
  );
}

export default App;

import './App.css';

function App() {
  const handleNewHook = (e) => {
    // send hook to endpoint
    console.log(e);
  };

  const handleNewEndpoint = (e) => {
    // send hook to endpoint
    console.log(e);
  };

  return (
    <>
      <div id="hook-button-container">
        <h2>Trigger an event by pressing a button below:</h2>
        <form id="hook-trigger-form" onSubmit={handleNewHook}>
          <ul>
            <li><input type="submit" name="button1" value="Event 1"/></li>
            <li><input type="submit" name="button2" value="Event 2"/></li>
            <li><input type="submit" name="button3" value="Event 3"/></li>
            <li><input type="submit" name="button4" value="Event 4"/></li>
          </ul>
        </form>
      </div>
      
      <div id="register-endpoint-container">
        <h2>Register Endpoint</h2>
        <form id="register-endpoint-form" onSubmit={handleNewEndpoint}>
          <h3>Enter the endpoint you'd like us to send webhooks to:</h3>
          <input type="text" id="endpoint" name="endpoint" 
            placeholder="https://yourwebsite.com/yourendpoint"/>
          <h3>Select which events you'd like to subscribe to:</h3>
          <ul id="event-list">
            <li>
              <label>Event 1
                <input type="checkbox" name="event1-checkbox"/>
              </label>
            </li>
            <li>
              <label>Event 2
                <input type="checkbox" name="event2-checkbox"/>
              </label>
            </li>
            <li>
              <label>Event 3
                <input type="checkbox" name="event3-checkbox"/>
              </label>
            </li>
            <li>
              <label>Event 4
                <input type="checkbox" name="event4-checkbox"/>
              </label>
            </li>
          </ul>
          <input type="submit" value="Create Endpoint"/>
        </form>
      </div>
      <div id="existing-endpoint-container">
        <h2>Registered Endpoints</h2>
          <ul>
            <li>
              <div htmlclass="url">
                <h3>Url:</h3>
                <p>http://requestbin.net/r/ed32sk9e</p>
              </div>
              <div htmlclass="events-followed">
                <h3>Events subscribed to:</h3>
                <p>1, 2, 4</p>
              </div>
            </li>
            <li>
              <div htmlclass="url">
                <h3>Url: </h3>
                <p>http://requestbin.net/r/4ieczbsk</p>
              </div>
              <div htmlclass="events-followed">
                <h3>Events subscribed to: </h3>
                <p>1, 2, 4</p>
              </div>
            </li>
          </ul>
      </div>
    </>
  );
}

export default App;

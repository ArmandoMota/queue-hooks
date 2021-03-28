import './App.css';

function App() {
  const newHookHandler = (eventType) => {
    return (e) => {
      // send hook to endpoint
      console.log(eventType);
      console.log(e);
    };
  };

  return (
    <div>
      <form>
        <div id="endpoint-config">
          <h2>Please enter the endpoint you'd like to send webhooks to:</h2>
          <input type="text" id="endpoint" name="endpoint" placeholder="https://yourwebsite.com/yourendpoint"/>
          <h2>Select which events you'd like to subscribe to:</h2>
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
        </div>
        <div id="hook-button-container">
          <h2>Trigger an event by pressing the button below:</h2>
          <ul>
            <li><button type="submit" name="button1" onClick={newHookHandler("event1")}>Event 1</button></li>
            <li><button type="submit" name="button2" onClick={newHookHandler("event2")}>Event 2</button></li>
            <li><button type="submit" name="button3" onClick={newHookHandler("event3")}>Event 3</button></li>
            <li><button type="submit" name="button4" onClick={newHookHandler("event4")}>Event 4</button></li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default App;

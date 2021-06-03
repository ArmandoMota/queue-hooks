#Overview

This app comes with two pieces:

- A backend that sends webhook requests to subscribed url endpoints
- A frontend that allows users to register new endpoints, view existing
  endpoints, delete endpoints, and trigger events

The frontend is mainly for testing and demo purposes. The backend, however, can
be used as a standalone webhook provider service and can be integrated into an
existing app.

#Setup

1. Download
2. Run npm install in both client and server folders
3. Add a `.env` file to the server folder, and add two properties: PORT (which
   should be 3001 unless you'd like to change some other settings), and DB
   (which needs to be a MongoDB URL to a MongoDB Atlas database).
4. Start the webhook service by running `npm run dev` inside the server folder.

#Features

- This webhook service uses a queue to concurrently process incoming events as
  well as retries
- This service is currently set to retry a message that failed to be
  successfully delivered to its endpoint up to 5 times. It uses an exponential
  backoff algorithm to increasingly space out the retries.

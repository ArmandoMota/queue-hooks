const express = require ('express');
const router = express.Router();
const subsController = require("../controllers/subsController");
const eventsController = require("../controllers/eventsController");
const messagesController = require("../controllers/messagesController");
// const attemptsController = require("../controllers/attemptsController");

router.get('/subs', subsController.getSubscriptions);
router.post('/subs', subsController.createSubscription);

router.get('/events', eventsController.getEvents);
router.post('/events', eventsController.createEvent);

router.get('/msgs', messagesController.getMessages);
router.post('/msgs',
  messagesController.createMessage,
  messagesController.findSubscriptions,
  messagesController.sendMessage,
);

// router.get('/attempts', attemptsController.getAttempts);
// router.get('/subs/:id/attempts', attemptsController.getAttemptsForSub);

module.exports = router;
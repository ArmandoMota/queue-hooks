const express = require("express");
const router = express.Router();
const subsController = require("../controllers/subsController");
const eventsController = require("../controllers/eventsController");
const messagesController = require("../controllers/messagesController");

router.get("/subs", subsController.getSubscriptions);
router.post(
  "/subs",
  subsController.createSubscription,
  messagesController.createMessage,
  messagesController.sendMessage
);
router.delete("/subs/:id", subsController.deleteSubscription);
router.delete("/subs", subsController.deleteAllSubscriptions);

router.get("/events", eventsController.getEvents);
router.post("/events", eventsController.createEvent);

router.get("/msgs", messagesController.getMessages);
router.post(
  "/msgs",
  messagesController.createMessage,
  messagesController.findSubscriptions,
  messagesController.sendMessage
);

module.exports = router;

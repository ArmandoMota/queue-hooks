const express = require("express");
const router = express.Router();
const appsController = require("../controllers/appsController");
const subsController = require("../controllers/subsController");
const topicsController = require("../controllers/topicsController");
const messagesController = require("../controllers/messagesController");
const eventsController = require("../controllers/eventsController");

router.get("/apps", appsController.getApps);
router.post("/apps", appsController.createApp);
router.patch("/apps/:id", appsController.updateApp);

router.get("/subs", subsController.getSubscriptions);
router.post("/subs", subsController.createSubscription);

router.get("/topics", topicsController.getTopics);
router.post("/topics", topicsController.createTopic);

router.get("/msgs", messagesController.getMessages);
router.post(
  "/msgs",
  eventsController.createEvent,
  subsController.getSubscriptionsByTopic,
  messagesController.createMessages
);

module.exports = router;

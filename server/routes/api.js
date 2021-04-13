const express = require("express");
const router = express.Router();
const appsController = require("../controllers/appsController");
const subsController = require("../controllers/subsController");
const eventTypesController = require("../controllers/eventTypesController");
const messagesController = require("../controllers/messagesController");
const eventsController = require("../controllers/eventsController");

router.get("/apps", appsController.getApps);
// router.get("/apps/:app_id", appsController.getApp);
router.post("/apps", appsController.createApp);
router.patch("/apps/:id", appsController.updateApp);
// router.delete("/apps/:id", appsController.deleteApp);

router.get("/apps/:app_id/event_types", eventTypesController.getEventTypes);
// router.get("/apps/:app_id/event_types/:event_id", eventTypesController.getEventType);
router.post("/apps/:app_id/event_types", eventTypesController.createEventType);
// router.patch("/apps/:app_id/event_types/:event_id", eventTypesController.createEventType);
// router.delete("/apps/:app_id/event_types/:event_id", eventTypesController.createEventType);

router.get("/apps/:app_id/subs", subsController.getSubscriptions);
// router.get("/apps/:app_id/subs/:sub_id", subsController.getSubscription);
router.post("/apps/:app_id/subs", subsController.createSubscription);
// router.patch("/apps/:app_id/subs/:sub_id", subsController.updateSubscription);
// router.delete("/apps/:app_id/subs/:sub_id", subsController.deleteSubscription);

router.get("/apps/:app_id/msgs", messagesController.getMessages);
router.post(
  "/apps/:app_id/msgs",
  eventsController.createEvent,
  subsController.getSubscriptionsByTopic,
  messagesController.createMessages
);

module.exports = router;

const express = require("express");
const router = express.Router();
const subsController = require("../controllers/subsController");
const topicsController = require("../controllers/topicsController");
const messagesController = require("../controllers/messagesController");

router.get("/subs", subsController.getSubscriptions);
router.post("/subs", subsController.createSubscription);

router.get("/topics", topicsController.getTopics);
router.post("/topics", topicsController.createTopic);

router.get("/msgs", messagesController.getMessages);
router.post("/msgs", messagesController.createMessage);

module.exports = router;

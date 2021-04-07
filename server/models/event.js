const mongoose = require("mongoose");
const Topic = require("./topic");
const Subscription = require("./subscription");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  affectedResource: String,
  payload: Schema.Types.Mixed,
  receivedAt: { type: Date, default: new Date() },
  topic: { type: Schema.Types.ObjectId, ref: Topic },
});

EventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;

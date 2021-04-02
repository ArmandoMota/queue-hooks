const mongoose = require("mongoose");
const Topic = require("./topic");
const Subscription = require("./subscription");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  topic: { type: Schema.Types.ObjectId, ref: Topic },
  firstDelivery: Date,
  latestDelivery: Date,
  deliveryAttempt: { type: Number, default: 1 },
  deliveryState: { type: Boolean, default: false },
  subscriptionId: { type: Schema.Types.ObjectId, ref: Subscription },
  affectedResource: String,
  payload: Schema.Types.Mixed,
});

MessageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;

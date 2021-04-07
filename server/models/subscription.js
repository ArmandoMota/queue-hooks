const mongoose = require("mongoose");
const Topic = require("./topic");

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  url: { type: String, required: true },
  topics: [{ type: Schema.Types.ObjectId, ref: Topic }],
  // filter: [{ type: Schema.Types.ObjectId, ref: Topic }],
  active: { type: Boolean, default: true },
  signingSecret: String,
  // authenticationMechanism: { type: ? }
  authenticationId: String,
  authenticationSecret: String,
  confirmation: Date,
});

SubscriptionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;

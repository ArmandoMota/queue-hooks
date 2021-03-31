const mongoose = require('mongoose');
const Event = require('./event');

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  url: { type: String, required: true },
  listeningFor: [
    { type: Schema.Types.ObjectId, ref: 'Event'},
  ],
});

SubscriptionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
const mongoose = require('mongoose');
const Event = require('./event');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  payload: Schema.Types.Mixed,
  eventId: { type: Schema.Types.ObjectId, ref: Event },
  createdAt: { type: Date, default: Date.now },
  receivedAt: Date,
  lastAttempted: { type: Date, default: Date.now },
  attemptCount: { type: Number, default: 1 },
});

MessageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
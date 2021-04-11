const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    payload: Object,
    eventId: { type: Schema.Types.ObjectId, ref: "Event" },
    lastAttempted: { type: Date, default: Date.now },
    attemptCount: { type: Number, default: 1 },
  },
  { timestamps: true }
);

MessageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;

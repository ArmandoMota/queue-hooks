const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  description: { type: String, required: true },
});

EventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
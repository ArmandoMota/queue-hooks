const App = require("../models/app");

const getApps = (req, res, next) => {
  App.find()
    .then((apps) => res.json(apps))
    .catch((error) => console.log(error));
};

const createApp = (req, res, next) => {
  console.log(req.body);
  App.create(req.body)
    .then((app) => res.json(app))
    .catch((error) => console.log(error));
};

const updateApp = (req, res, next) => {
  const newName = req.body.name;
  const updates = { name: newName };

  App.findByIdAndUpdate(req.params.id, updates, { new: true })
    .then((app) => res.json(app))
    .catch((error) => console.log(error));
};

exports.getApps = getApps;
exports.createApp = createApp;
exports.updateApp = updateApp;

const Athlete = require('../models/rosterModel');

const rosterController = {};

rosterController.getRoster = (req, res, next) => {
  Athlete.find({}, (err, roster) => {
    if (err) return next(err);
    res.locals.roster = roster;
    return next();
  });
};

  module.exports = rosterController;
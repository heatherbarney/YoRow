const Athlete = require('../models/rosterModel');

const rosterController = {};

rosterController.getRoster = (req, res, next) => {
  Athlete.find({}, (err, roster) => {
    if (err) return next(err);
    res.locals.roster = roster;
    return next();
  });
};

rosterController.addAthlete = (req, res, next) => {
  const newAthlete = new Athlete(req.body);
  newAthlete.save(err => {
    if (err) return next (err);
    else {
      res.locals.newAthlete = newAthlete
      return next();
    }
  })
}

  module.exports = rosterController;
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
  const { name, positions, available } = req.body;
  const newAthlete = new Athlete({ name, positions, available });
  newAthlete.save(err => {
    if (err) return next (err);
    else {
      res.locals.newAthlete = newAthlete
      return next();
    }
  })
}

rosterController.deleteAthlete = (req, res, next) => {
  const name = req.params.name;
  Athlete.findOneAndRemove({name: name}, (err, athlete) => {
    if (err) return next(err);
    res.locals.deletedAthlete = athlete;
    return next();
  })
}

  module.exports = rosterController;
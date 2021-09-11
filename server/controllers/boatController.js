const Boat = require('../models/boatModel');

const boatController = {};

boatController.getFleet = (req, res, next) => {
    Boat.find({}, (err, fleet) => {
      if (err) return next(err);
      res.locals.fleet = fleet;
      return next();
    });
  };

  module.exports = boatController;

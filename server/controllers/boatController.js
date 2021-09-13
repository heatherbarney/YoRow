const Boat = require('../models/boatModel');

const boatController = {};

  boatController.getFleet = (req, res, next) => {
    Boat.find({}, (err, fleet) => {
      if (err) return next(err);
      res.locals.fleet = fleet;
      return next();
    });
  };

  boatController.deleteBoat = (req, res, next) => {
    const name = req.params.name;
    console.log(name);
    Boat.findOneAndRemove({name: name}, (err, boat) => {
      if (err) return next(err);
      res.locals.deletedBoat = boat;
      return next();
    })
  }

  module.exports = boatController;

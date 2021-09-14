const Boat = require('../models/boatModel');

const boatController = {};

  boatController.getFleet = (req, res, next) => {
    Boat.find({}, (err, fleet) => {
      if (err) return next(err);
      res.locals.fleet = fleet;
      return next();
    });
  };

  boatController.addBoat = (req, res, next) => {
    const newBoat = new Boat(req.body);
    newBoat.save(err => {
      if (err) return next (err);
      else {
        res.locals.newBoat = newBoat
        return next();
      }
    })
  }

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

const Practice = require('../models/practiceModel');

const practiceController = {};

  practiceController.getPractice = (req, res, next) => {
    const date = req.params.date;
    Practice.findOne({ date: date }, (err, practice) => {
      if (err) return next(err);
      res.locals.practice = practice;
      return next();
    });
  };

  practiceController.addPractice = (req, res, next) => {
    const { date, lineups, boats } = req.body;
    const newPractice = new Practice({ date, lineups, boats });
    newPractice.save(err => {
      if (err) {
        console.log(err);
        return next (err);
      }
      else {
        res.locals.newPractice = newPractice
        return next();
      }
    })
  }

  practiceController.deletePractice = (req, res, next) => {
    const date = req.params.date;
    Practice.findOneAndRemove({date: date}, (err, practice) => {
      if (err) return next(err);
      res.locals.deletedPractice = practice;
      return next();
    })
  }

  module.exports = practiceController;
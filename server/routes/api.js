const express = require('express');

const rosterController = require('../controllers/rosterController');
const boatController = require('../controllers/boatController');
const practiceController = require('../controllers/practiceController');

const router = express.Router();

router.get('/roster',
  rosterController.getRoster,
  (req, res) => res.status(200).json(res.locals.roster)
);

router.get('/boats',
  boatController.getFleet,
  (req, res) => res.status(200).json(res.locals.fleet)
);

router.get('/practice/:date', 
  practiceController.getPractice,
  (req, res) => res.status(200).json(res.locals.practice)
);

router.post('/roster',
  rosterController.addAthlete,
  (req, res) => res.status(200).json(res.locals.newAthlete)
);

router.post('/boats',
  boatController.addBoat,
  (req, res) => res.status(200).json(res.locals.newBoat)
);

router.post('/practice', debuggingCheck,
  practiceController.addPractice,
  (req, res) => res.status(200).json(res.locals.newPractice)
);


router.delete('/roster/:name', debuggingCheck,
  rosterController.deleteAthlete,
  (req, res) => res.status(200).json(res.locals.deletedAthlete)
);

router.delete('/boats/:name', debuggingCheck,
  boatController.deleteBoat,
  (req, res) => res.status(200).json(res.locals.deletedBoat)
);

function debuggingCheck (req, res, next) {
  console.log('Request made it to the API!');
  next();
}

module.exports = router;
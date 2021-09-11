const express = require('express');

const rosterController = require('../controllers/rosterController');
const boatController = require('../controllers/boatController');

const router = express.Router();

router.get('/roster',
  rosterController.getRoster,
  (req, res) => res.status(200).json(res.locals.roster)
);

router.get('/boats',
  boatController.getFleet,
  (req, res) => res.status(200).json(res.locals.fleet)
);

router.post('/roster',
  rosterController.addAthlete,
  (req, res) => res.status(200).json(res.locals.newAthlete)
);

router.delete('/roster/:name', debuggingCheck,
  rosterController.deleteAthlete,
  (req, res) => res.status(200).json(res.locals.deletedAthlete)
);

function debuggingCheck (req, res, next) {
  console.log('Request made it to the API!');
  next();
}

module.exports = router;
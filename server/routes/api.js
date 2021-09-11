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

module.exports = router;
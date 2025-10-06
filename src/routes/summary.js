const express = require('express');
const router = express.Router();
const { getCandleSummary } = require('../controllers/summary.controller');
const { validateCandleRequest } = require('../middlewares/validate');

router.get('/analysis', validateCandleRequest, getCandleSummary);

module.exports = router;
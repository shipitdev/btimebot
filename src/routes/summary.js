const express = require("express");
const { getCandleSummary } = require("../controllers/summary.controller");
const { validateRequest } = require("../middlewares/validateRequest");

const router = express.Router();

router.get("/", validateRequest, getCandleSummary);

module.exports = router;
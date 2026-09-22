const express = require('express');
const router = express.Router();

const {
  getCompletedReport,
  getPendingReport,
  getSummaryReport,
} = require('../controllers/reportController');

router.get('/completed', getCompletedReport);
router.get('/pending', getPendingReport);
router.get('/summary', getSummaryReport);

module.exports = router;

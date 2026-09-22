const taskStore = require('../data/taskStore');

// GET /reports/completed
function getCompletedReport(req, res) {
  const tasks = taskStore.readAll().filter((t) => t.status === 'completed');
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
}

// GET /reports/pending
function getPendingReport(req, res) {
  const tasks = taskStore.readAll().filter((t) => t.status === 'pending');
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
}

// GET /reports/summary
function getSummaryReport(req, res) {
  const tasks = taskStore.readAll();
  const summary = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    byPriority: {
      low: tasks.filter((t) => t.priority === 'low').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      high: tasks.filter((t) => t.priority === 'high').length,
    },
  };
  res.status(200).json({ success: true, data: summary });
}

module.exports = { getCompletedReport, getPendingReport, getSummaryReport };

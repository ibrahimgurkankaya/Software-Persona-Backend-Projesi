const { TASK_STATUSES, TASK_PRIORITIES } = require('../models/Task');

function validateTaskCreate(req, res, next) {
  const { title, description, priority, assignee } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('title alani zorunludur ve bos olamaz.');
  }
  if (!description || typeof description !== 'string' || !description.trim()) {
    errors.push('description alani zorunludur ve bos olamaz.');
  }
  if (!priority || !TASK_PRIORITIES.includes(priority)) {
    errors.push(`priority alani zorunludur ve su degerlerden biri olmalidir: ${TASK_PRIORITIES.join(', ')}.`);
  }
  if (!assignee || typeof assignee !== 'string' || !assignee.trim()) {
    errors.push('assignee alani zorunludur ve bos olamaz.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Gecersiz veya eksik veri.', errors });
  }

  next();
}

function validateTaskUpdate(req, res, next) {
  const { title, description, priority, assignee, status } = req.body;
  const errors = [];

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    errors.push('title alani bos olamaz.');
  }
  if (description !== undefined && (typeof description !== 'string' || !description.trim())) {
    errors.push('description alani bos olamaz.');
  }
  if (priority !== undefined && !TASK_PRIORITIES.includes(priority)) {
    errors.push(`priority su degerlerden biri olmalidir: ${TASK_PRIORITIES.join(', ')}.`);
  }
  if (assignee !== undefined && (typeof assignee !== 'string' || !assignee.trim())) {
    errors.push('assignee alani bos olamaz.');
  }
  if (status !== undefined && !TASK_STATUSES.includes(status)) {
    errors.push(`status su degerlerden biri olmalidir: ${TASK_STATUSES.join(', ')}.`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Gecersiz veya eksik veri.', errors });
  }

  next();
}

module.exports = { validateTaskCreate, validateTaskUpdate };

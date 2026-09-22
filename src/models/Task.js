const { randomUUID } = require('crypto');

const TASK_STATUSES = ['pending', 'in-progress', 'completed'];
const TASK_PRIORITIES = ['low', 'medium', 'high'];

function createTask({ title, description, priority, assignee, status }) {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    title,
    description,
    status: status || 'pending',
    priority,
    assignee,
    createdAt: now,
    updatedAt: now,
  };
}

module.exports = { createTask, TASK_STATUSES, TASK_PRIORITIES };

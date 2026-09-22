const taskStore = require('../data/taskStore');
const { createTask: buildTask } = require('../models/Task');

// GET /tasks  (opsiyonel: ?status=&priority=&page=&limit=&sort=)
function getAllTasks(req, res) {
  let tasks = taskStore.readAll();
  const { status, priority, page, limit, sort } = req.query;

  if (status) {
    tasks = tasks.filter((t) => t.status === status);
  }
  if (priority) {
    tasks = tasks.filter((t) => t.priority === priority);
  }
  if (sort) {
    const field = sort.startsWith('-') ? sort.slice(1) : sort;
    const direction = sort.startsWith('-') ? -1 : 1;
    tasks = [...tasks].sort((a, b) => (a[field] > b[field] ? 1 : -1) * direction);
  }

  const total = tasks.length;

  if (page || limit) {
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
    const start = (pageNum - 1) * limitNum;
    tasks = tasks.slice(start, start + limitNum);
    return res.status(200).json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      count: tasks.length,
      data: tasks,
    });
  }

  res.status(200).json({ success: true, total, data: tasks });
}

// GET /tasks/search?keyword=
function searchTasks(req, res) {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ success: false, message: 'keyword query parametresi zorunludur.' });
  }
  const lower = keyword.toLowerCase();
  const tasks = taskStore
    .readAll()
    .filter(
      (t) =>
        t.title.toLowerCase().includes(lower) || t.description.toLowerCase().includes(lower)
    );
  res.status(200).json({ success: true, total: tasks.length, data: tasks });
}

// GET /tasks/assignee/:name
function getTasksByAssignee(req, res) {
  const { name } = req.params;
  const tasks = taskStore
    .readAll()
    .filter((t) => t.assignee.toLowerCase() === name.toLowerCase());
  res.status(200).json({ success: true, total: tasks.length, data: tasks });
}

// GET /tasks/:id
function getTaskById(req, res) {
  const task = taskStore.readAll().find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, message: `ID'si ${req.params.id} olan gorev bulunamadi.` });
  }
  res.status(200).json({ success: true, data: task });
}

// POST /tasks
function createTaskHandler(req, res) {
  const tasks = taskStore.readAll();
  const newTask = buildTask(req.body);
  tasks.push(newTask);
  taskStore.writeAll(tasks);
  res.status(201).json({ success: true, data: newTask });
}

// PUT /tasks/:id
function updateTaskHandler(req, res) {
  const tasks = taskStore.readAll();
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: `ID'si ${req.params.id} olan gorev bulunamadi.` });
  }

  const updatedTask = {
    ...tasks[index],
    ...req.body,
    id: tasks[index].id,
    createdAt: tasks[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  tasks[index] = updatedTask;
  taskStore.writeAll(tasks);
  res.status(200).json({ success: true, data: updatedTask });
}

// DELETE /tasks/:id
function deleteTaskHandler(req, res) {
  const tasks = taskStore.readAll();
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: `ID'si ${req.params.id} olan gorev bulunamadi.` });
  }

  const [deleted] = tasks.splice(index, 1);
  taskStore.writeAll(tasks);
  res.status(200).json({ success: true, message: 'Gorev silindi.', data: deleted });
}

module.exports = {
  getAllTasks,
  searchTasks,
  getTasksByAssignee,
  getTaskById,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
};

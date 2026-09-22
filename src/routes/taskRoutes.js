const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  searchTasks,
  getTasksByAssignee,
  getTaskById,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} = require('../controllers/taskController');
const { validateTaskCreate, validateTaskUpdate } = require('../middleware/validateTask');

// Sabit path'ler ("/search", "/assignee/:name") "/:id" tanimindan once gelmelidir.
router.get('/search', searchTasks);
router.get('/assignee/:name', getTasksByAssignee);

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', validateTaskCreate, createTaskHandler);
router.put('/:id', validateTaskUpdate, updateTaskHandler);
router.delete('/:id', deleteTaskHandler);

module.exports = router;

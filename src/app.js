const express = require('express');
const logger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TaskFlow API calisiyor.',
    endpoints: {
      tasks: '/tasks',
      reports: '/reports',
    },
  });
});

app.use('/tasks', taskRoutes);
app.use('/reports', reportRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

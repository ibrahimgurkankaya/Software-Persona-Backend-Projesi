function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Endpoint bulunamadi: ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Sunucu hatasi olustu.',
  });
}

module.exports = { notFound, errorHandler };

export function notFound(req, res) { res.status(404).json({ message: `Route ${req.method} ${req.path} was not found.` }); }
export function errorHandler(error, req, res, next) {
  console.error(error);
  if (error.name === 'ZodError') return res.status(400).json({ message: 'Invalid request data.', issues: error.issues });
  if (error.code === 11000) return res.status(409).json({ message: 'That value is already in use.' });
  res.status(error.statusCode || 500).json({ message: error.statusCode ? error.message : 'Something went wrong.' });
}

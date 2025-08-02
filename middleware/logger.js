const logger = (req, res, next) => {
  const start = Date.now();

  // لما ينتهي الرد، سجل البيانات
  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`;

    console.log(log);
  });

  next(); // تابع لباقي الميدل وير
};

module.exports = logger;
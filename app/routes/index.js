const express = require("express");
const router = express.Router();
const applicationRoutes = require('../routes/application.routes');

// Import route files

// Define routes
router.use("/application", applicationRoutes);

module.exports = router;

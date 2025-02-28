const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application.controller");

// Create a new Application
router.post("/create", applicationController.create);

module.exports = router;

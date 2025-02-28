const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application.controller");

// Create a new Application
router.post("/create", applicationController.create);
router.get("/all", applicationController.getApplications);

module.exports = router;

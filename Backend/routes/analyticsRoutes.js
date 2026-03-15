const express = require("express");
const router = express.Router();

const { getUserProgress } = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/progress", protect, getUserProgress);

module.exports = router;

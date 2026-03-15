const express = require("express");
const router = express.Router();

const {
  createTopic,
  getTopicsByDomain,
  deleteTopic,
} = require("../controllers/topicController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

/* Public Route */
router.get("/domain/:domainId", getTopicsByDomain);

/* Admin Routes */
router.post("/", protect, adminOnly, createTopic);
router.delete("/:id", protect, adminOnly, deleteTopic);

module.exports = router;
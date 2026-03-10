const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/upsert-user", controller.upsertUser);
router.post("/upsert-folder", controller.upsertFolder);

module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/upsert-user", controller.upsertUser);
router.post("/upsert-folder", controller.upsertFolder);
router.post("/login",controller.loginUser);
router.get("/folders", controller.getFolders);

module.exports = router;
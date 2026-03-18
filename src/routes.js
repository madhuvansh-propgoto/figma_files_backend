const express = require("express");
const router = express.Router();
const controller = require("./controller");

const upload = require("./middleware/upload");

router.post("/upsert-user", controller.upsertUser);
router.post("/upsert-folder", controller.upsertFolder);
router.post("/login",controller.loginUser);
router.get("/folders", controller.getFolders);


// console.log("UPLOAD:-----", upload);

router.post("/files", upload.single("file"), controller.uploadFile);
router.get("/files/:folderId", controller.getFilesByFolder);

module.exports = router;
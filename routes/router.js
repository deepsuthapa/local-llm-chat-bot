const express = require("express");
const { hello, get360MModel } = require("../controller/controller");

const router = express.Router();

router.get("/", hello);
router.post("/get-response", get360MModel);

module.exports = { router };

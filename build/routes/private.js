"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const private_1 = require("../controllers/private");
const private_2 = require("../middlewares/private");
const router = (0, express_1.Router)();
router.get('/graphinfo', private_2.protect, private_1.Darshboard);
exports.default = router;

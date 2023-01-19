"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post('/signup', auth_1.SignUp);
router.post('/signin', auth_1.SignIn);
router.get('/check/:user', auth_1.UserCheck);
exports.default = router;

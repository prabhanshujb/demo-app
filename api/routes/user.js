const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const User = require("../models/user");
const userController = require('../controllers/userController')

router.post('/signup', userController.userRegister);

router.post("/login", userController.userlogin);

router.delete('/:userId', userController.userDelete);

module.exports = router;
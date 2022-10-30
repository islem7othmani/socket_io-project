const {getUsers} = require('../controllers/user.controllers');
const router = require('express').Router();
const userModel = require("../models/user.model")


router.get("/users", getUsers);


module.exports=router;
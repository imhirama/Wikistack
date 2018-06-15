const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser')
const layout = require('../views/layout')


router.use(bodyParser.urlencoded({extended: true}));

module.exports = router


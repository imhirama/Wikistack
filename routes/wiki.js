const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser')
const layout = require('../views/layout')
const addPage = require('../views/addPage')


router.use(bodyParser.urlencoded({extended: true}));

router.get('/', (req, res, next) => {
	res.send(layout(''))
});

router.post('/', (req,res) => {
	res.send(layout(req.body.email));
});

router.get('/add', (req, res, next) => {
	res.send(addPage());
});

module.exports = router

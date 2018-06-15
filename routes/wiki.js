const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser')
const layout = require('../views/layout')
const wikipage = require('../views/wikipage')


router.use(bodyParser.urlencoded({extended: true}));

router.get('/', (req, res, next) => {
	res.send(layout(''))
});

router.get('/add', (req, res, next) => {
	res.send(addPage());
});

const { Page } = require("../models");
const { addPage } = require("../views");

router.post('/', async(req, res, next) => {
  const page = new Page({
    title: req.body.title, //in a post (made in HTML form) the req is the json object of what we input
    content: req.body.content
  });


  function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

Page.beforeValidate((pageInstance)=> {
	pageInstance.slug = generateSlug(pageInstance.title)
});

  try {
  	console.log(page)
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error)
  }
});

  router.get('/:slug', async (req, res, next) => {
	  try{
	  	const page = await Page.findOne({
	  		where: {
	  			slug: req.params.slug
	  		}
	  	});
	  	res.send(wikipage(page));

	  }catch (error) {next(error)}

});

module.exports = router
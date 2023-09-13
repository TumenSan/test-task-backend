const Router = require("express").Router;
const NewsController = require("../controllers/NewsController");
const router = new Router();
const express = require('express');
const jsonParser = express.json();

router.get('/api/news/:id', jsonParser, NewsController.GetNews);
router.get('/api/comment/:id', jsonParser, NewsController.GetComment);
router.get('/api/maxitem', jsonParser, NewsController.GetMaxItem);

module.exports = router;
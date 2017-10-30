const express = require('express');
const router = express.Router();
const request = require('request'); //解决服务请求转发
const books = require('./books.json');

/* GET users listing. */
router.get('/api/bookid', function(req, res, next) {
    let url = 'https://api.douban.com/v2/book/' + req.query.id;
    console.log(url);
    req.pipe(request(url)).pipe(res);
});

router.get('/api/books', function(req, res, next) {
    res.json(books);
});

router.get('/api/search', function(req, res) {
    let url = 'https://api.douban.com/v2/book/search';
    console.log(req.query.q);
    req.pipe(request(url)).pipe(res);
});

module.exports = router;
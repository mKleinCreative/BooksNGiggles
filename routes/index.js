var express = require('express');
var router = express.Router();
var db = require('../database')
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// INDEX
router.get('/', (req, res) => {
  let page = ( parseInt( req.query.page, 10 ) ) || 1
  db.Books.all(page)
    .then(books => {
      res.render('/books/show', { books, page })
    })
    .catch(error => {
      console.log('im an error1!')
      res.render('error', {error})
    })
})






module.exports = router;

var express = require('express');
var router = express.Router();
var { Books, Search, db } = require('../database')
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// INDEX

const PAGE_SIZE = 10

router.get( '/', function( request, response) {
  const { query } = request

  const page = parseInt( query.page ) || 1
  const size = query.size || 10
  const searchBy = query.type

  if( searchBy === undefined ) {
    Books.all( page, size )
      .then( books => response.render( 'index', { books, page, size } ))
      .catch( error => response.send({ error, message: error.message }))
  } else {
    console.log('in the switch statement', searchBy)
    debugger
    switch(searchBy) {
      case 'byAuthor':
        Search.byAuthor(query.search)
        .then( books =>  response.render( 'index', { books, page, size } ))
        .catch( error => response.send({ error, message: error.message }))
        break
      case 'byGenre':
        Search.byGenre(query.search)
          .then( books => response.render( 'index', { books, page, size } ))
          .catch( error => response.send({ error, message: error.message }))
          break
      default:
        console.log('searching by Title')
        Search.byTitle(query.search)
        .then( books => {
          console.log(books)
          response.render( 'books/show', { books, page, size } )
        })
        .catch( error =>{
          console.log(error)
          response.send({ error, message: error.message })
        })

    }
  }
})




const getBooksSearch = (search, type) => page => {
  return Search[ type ]( search )
    .then( books => Promise.resolve([ books.length, books ]))
}

const getBooksPage = page =>
  Promise.all([
    Books.count(),
    Books.all( PAGE_SIZE * ( page - 1 ))
  ])

const getAuthorsAndGenres = result => {
  const [ countResult, books ] = result
  const bookIds = books.map( book => book.id )

  if( bookIds.length === 0 ) {
    return Promise.all([
      Promise.resolve( countResult.count ),
      Promise.resolve( books ),
      Promise.resolve( [] ),
      Promise.resolve( [] )
    ])
  }

  return Promise.all([
    Promise.resolve( countResult.count ),
    Promise.resolve( books ),
    Authors.forBooks( bookIds ),
    Genres.forBooks( bookIds )
  ])
}

const mergeBookFields = result => {
  const [ count, rawBooks, bookAuthors, bookGenres ] = result

  const books = rawBooks.map( book => {
    const authors = bookAuthors.filter( author => author.book_id === book.id )
    const genres = bookGenres.filter( genre => genre.book_id === book.id )

    return Object.assign( {}, book, { authors, genres })
  })

  return Promise.resolve({ count, books })
}

const bookListing = (bookFetch, page) =>
  bookFetch( page )
    .then( getAuthorsAndGenres )
    .then( mergeBookFields )

module.exports = router;

const express = require('express')
const router = express.Router()

const { Books, Authors, BookAuthors } = require( '../database' )


router.get('/', function(req, res) {
  res.send('hello world ')
})


router.get('/add', (request, response) => {
  response.render( 'books/form', { book: {} } )
})

router.post('/add', (request, response) => {
  const { title, author, genre, image, description } = request.body

  Promise.all([
    Book.createBookSql( request.body),
    db.addAuthor( author )
  ])
  .then( results => {
    const bookId = results[0]
    const authorId = results[1]

    db.connectAuthorsWithBook(authorId.id, bookId.id)
    .then( (results) => {
      response.redirect(`/books/details/${results.book_id}`)
    })
  })
  .catch( (error) => {
      response.render('error', { error: error } )
  })

})






router.get( '/add', ( request, response, next ) => {
  response.render( 'books/form', { book: {} } )
})

router.get( '/:id', ( request, response, next ) => {
  const { id } = request.params

  Promise.all([
    Books.findById( id ),
    Books.findAuthorsByBookId( id ),
    Books.findGenresByBookId( id )
  ])
  .then( result => {
    const [ book, authors, genres ] = result
    response.render( 'books/detail', { book, authors, genres })
  })
  .catch( error => response.send({ error, message: error.message }))
})

router.post( '/', ( request, response, next ) => {
  const { title, description, image, published, author } = request.body

  Promise.all([
    Books.createBook( title, description, image, published ),
    Authors.create( author )
  ])
  .then( result => BookAuthors.create( result[ 0 ].id, result[ 1 ].id ))
  .then( result => response.redirect( `/books/${result.book_id}` ))
  .catch( error => response.send({ message: error.message }))
})

router.post( '/:id', (request, response, next) => {
  const { title, description, image, published, author } = request.body

  .then( result => response.redirect( `/books/${result.book_id}` ))
  .catch( error => response.send({ message: error.message }))
})

router.get( '/delete/:id', ( request, response, next ) => {
  Books.delete( request.params.id )
    .then( result => response.redirect( '/' ))
    .catch( error => response.send({ message: error.message }))
})

router.get( '/edit/:id', ( request, response, next ) => {
  Books.findById( request.params.id )
    .then( book => response.render( 'books/form', { book }))
    .catch( error => response.send({ message: error.message }))
})

router.get( '/new/:id', ( request, response, next ) => {
  response.redirect( '/' )
})

module.exports = router

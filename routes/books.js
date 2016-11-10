const express = require('express')
const router = express.Router()

const { Books, Authors, Genres, BookAuthors, db } = require( '../database' )


router.get('/', function(req, res) {
  //res.send('hello world ')

  Books.all()
    .then(books => {
      res.render('books/show', { books: books })
    })
    .catch(error => {
      response.render('error', { error: error } )
    })
})


router.get('/new', (request, response) => {
  response.render( 'books/new', { book: {} } )
})

router.post('/new', (request, response) => {
  const { title, author, genre, image, description } = request.body
  const book = { title, author, genre, image, description }

  Promise.all([
    Books.createBook(title, author, genre, description, image),
    Authors.create(author),
    Genres.create(genre)
  ])
  .then( results => {
    const bookId = results[0].id
    const authorId = results[1].id
    const genreId = results[2].id

    response.render(`books/detail`, { book })
    // db.connectAuthorsWithBook(authorId.id, bookId.id)
    // .then( (results) => {
    //   response.redirect(`/books/detail/${results.book_id}`)
    // })
  })
  .catch( (error) => {
      response.render('error', { error: error } )
  })

})

router.get( '/new', ( request, response, next ) => {
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

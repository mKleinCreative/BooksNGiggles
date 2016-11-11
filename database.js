const pgp = require('pg-promise')()
const db = pgp({database: 'booksngiggles_development'})

const createBookSql = `INSERT INTO book (title, description, image_url) VALUES ( $1, $2, $3 ) RETURNING id`

const Books = {
  count: () => db.one(
    `SELECT COUNT(*)
    FROM book` ),
  all: () => db.any(
    `SELECT *
     FROM book order by id asc` ),
  // all: offset => db.any(
  //   `SELECT *
  //    FROM book order by id asc
  //    LIMIT 10 OFFSET $1`, [ offset ] ),
  findById: id => db.one( `
  SELECT *
  FROM book
  WHERE id=$1`, [id] ),
  findAuthorsByBookId: id => db.any(
    `SELECT *
    FROM author
    JOIN book_author
    ON book_author.author_id=author.id
    WHERE book_author.book_id=$1`, [id]),
  findGenresByBookId: id => db.any(`SELECT * FROM genre JOIN book_genre ON book_genre.genre_id=genre.id WHERE book_genre.book_id=$1`, [id]),
  createBook: ( title, description, image_url ) => db.one( createBookSql, [title, description, image_url] ),
  delete: id => db.none( `DELETE FROM book WHERE id=$1`, [id])
}

const Authors = {
  create: name => db.one( 'INSERT INTO author ( name ) VALUES ( $1 ) RETURNING id', [name] ),
  all: all => db.any( 'SELECT * FROM author order by id asc' ),
  getNameById: id => db.one('SELECT name FROM author WHERE id=$1', [id]),
  forBooks: ids => db.any( 'SELECT * FROM author JOIN book_author ON book_author.author_id=author.id WHERE book_author.book_id IN ($1:csv)', [ids] )
}

const Genres = {
  create: name => db.one( 'INSERT INTO genre ( name ) VALUES ( $1 ) RETURNING id', [name] ),
  getNameById: id => db.one('SELECT name FROM genre WHERE id=$1', [id]),
  forBooks: ids => db.any( 'SELECT * FROM genre JOIN book_genre ON book_genre.genre_id=genre.id WHERE book_genre.book_id IN ($1:csv)', [ids] )
}

const BookAuthors = {
  create: (book_id, author_id) => db.one( 'INSERT INTO book_author ( book_id, author_id ) VALUES ( $1, $2 ) RETURNING book_id', [ book_id, author_id ] ),
  all: all => db.any( 'SELECT * FROM book_author' )
}

const BookGenres = {
  create: (book_id, genre_id) => db.one( 'INSERT INTO book_genre ( book_id, genre_id ) VALUES ( $1, $2 ) RETURNING book_id', [ book_id, genre_id ] ),
  all: all => db.any( 'SELECT * FROM book_genre' )
}

const Search = {
  byTitle: title => {
    const sql = `SELECT * FROM book WHERE lower(title) LIKE '%${title}%'`
    return db.any( sql )
  },
  byGenre: genreName => {
    const sql =
      `SELECT book.* FROM book
       JOIN book_genre ON book_genre.book_id=book.id
       JOIN genre ON book_genre.genre_id=genre.id
       WHERE lower(genre.name) LIKE '%${genreName}%'`

    return db.any( sql )
  },
  byAuthor: authorName => {
    const sql =
      `SELECT book.* FROM book
       JOIN book_author ON book_author.book_id=book.id
       JOIN author ON book_author.author_id=author.id
       WHERE lower(author.name) LIKE '%${authorName}%'`

    return db.any( sql )
  },
  byBookAuthor: () => {
    // const sql =
    //   `SELECT *
    // FROM book b
    // JOIN book_author ON book_author.book_id=b.id
    // JOIN book_genre ON book_genre.book_id=b.id`
    const sql = `SELECT b.*, a.name AS author_name, g.name AS genre_name
    FROM book b
    JOIN book_author AS ba ON ba.book_id=b.id
    JOIN book_genre AS bg ON bg.book_id=b.id
    JOIN author AS a ON ba.author_id=a.id
    JOIN genre AS g ON bg.genre_id=g.id`
    
    return db.any( sql )
  }
}


module.exports = {
  Books, Authors, BookAuthors, Genres, Search, db, BookGenres
}

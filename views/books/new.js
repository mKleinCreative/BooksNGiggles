extends ../layout

block content
  h2.h2.text-center Please add a new book

  form.form-hortizontal(method='post', action=('/books/new'))
    .form-group.newbook
      input.form-control(type='text', name='title', placeholder='Title')

    .form-group.newbook
      input.form-control(type='text', name='author', placeholder='Author')

    .form-group.newbook
      input.form-control(type='text', name='genre', placeholder='Genre')

    .form-group.newbook
      textarea.form-control(name='description', placeholder='Description')

    .form-group.newbook
      input.form-control(type='text', name='image', placeholder='Image URL')

    .form-group
      button.btn.btn-success(type='submit') Add This Book

      // extends ../layout
      //
      // block content
      //   .addBook
      //     form(method='post', action=`/books${ book ? '' : '/' + book.id}`)
      //       div.textBox1
      //         input.inputAll(type='text', name='title', placeholder='Title', value=`${book.title || ''}`)
      //       div.textBox
      //         input.inputAll(type='text', name='author', placeholder='Author')
      //       div.textBox
      //         textarea.inputAll(name='description', placeholder='Description')= book.description
      //       div.textBox
      //         input.inputAll(type='text', name='image', placeholder='Image URL', value=`${book.image || ''}`)
      //       div.textBox
      //         input.inputAll(type='text', name='published', placeholder='Published Date mm-dd-yy', value=`${book.published || ''}`)
      //       div.textBox
      //         input.submit(type='submit', value='Submit')

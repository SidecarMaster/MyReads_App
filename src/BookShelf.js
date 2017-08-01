/*jshint esversion: 6 */

import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

function BookShelf (props) {
  const { books, sectionName, onShelfChange } = props

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{sectionName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map( book => (
            <li key={book.id}>
              <Book book={book} onShelfChange={onShelfChange}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  sectionName: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default BookShelf;

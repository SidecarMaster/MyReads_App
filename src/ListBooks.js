import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {

  render () {
    const { books, onShelfChange } = this.props

    const currentlyReading = books.filter( book => book.shelf === "currentlyReading")
    const wantToRead = books.filter( book => book.shelf === "wantToRead")
    const read = books.filter( book => book.shelf === "read")

    // Don't repeat yourself
    const shelves = [
      {sectionName:"Currently Reading", books:currentlyReading},
      {sectionName:"Want to Read", books:wantToRead},
      {sectionName:"Read", books:read}
    ]

    return (
      //React element has to return only one element.
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {/* pass in two arguments, the shelf object, and the index */}
          {shelves.map( (shelf, index) => (
            <BookShelf
              key={index}
              sectionName = { shelf.sectionName }
              books = { shelf.books }
              onShelfChange = { onShelfChange }
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/searchbook">Add a book</Link>
        </div>
      </div>
    )
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default ListBooks;

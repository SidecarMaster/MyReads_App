import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {

  render () {
    const { books, onShelfChange } = this.props
    const currentlyReading = books.filter( book => book.shelf === "currentlyReading")
    const wantToRead = books.filter( book => book.shelf === "wantToRead")
    const read = books.filter( book => book.shelf === "read")

    return (
      //React element has to return only one element.
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            sectionName="Currently Reading"
            books={currentlyReading}
            onShelfChange={ onShelfChange }
          />
          <BookShelf
            sectionName="Want to Read"
            books={wantToRead}
            onShelfChange={ onShelfChange }
          />
          <BookShelf
            sectionName="Read"
            books={read}
            onShelfChange={ onShelfChange }
          />
        </div>
        <div className="open-search">
          <Link to="/searchbook">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;

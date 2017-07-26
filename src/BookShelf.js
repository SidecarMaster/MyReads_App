import React from 'react'

class BookShelf extends React.Component {
  render () {

    const { books, shelf, sectionName } = this.props
    let belongToShelf = books.filter( book => book.shelf === shelf)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{sectionName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {belongToShelf.map( book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors.map(author=>(
                      <p key={author}>{author}</p>
                    ))}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;

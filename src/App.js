import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import { Route, Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books })
      console.log(this.state.books)
      console.log(this.state.books[0].imageLinks.thumbnail)
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/searchbook" render={()=> (
          <SearchBook />
        )}/>
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf sectionName="Currently Reading" shelf="currentlyReading" books={this.state.books}/>
                <BookShelf sectionName="Want to Read" shelf="wantToRead" books={this.state.books}/>
                <BookShelf sectionName="Read" shelf="read" books={this.state.books}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/searchbook">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp

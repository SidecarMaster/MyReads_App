import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books })
      console.log(this.state.books)
    }).catch( () =>
      alert("Error when fetching data")
    )
  }

  shelfChange(target) {
    // update state at the server
    BooksAPI.update({id: target.id}, target.value).then(e => {
      console.log(e)
    }).catch( () =>
      alert("Error when updating shelf")
    )
    // update state locally
    this.setState( prevState => {
      // check if the target is currently in the shelves
      const isPresent = prevState.books.find( book => (
        book.id === target.id
      ))
      // process the target depending on isPresnet value
      if (isPresent) {
        prevState.books.filter(book => book.id===target.id)[0].shelf = target.value
      } else {
        prevState.books.concat(
          Object.assign({}, target, { shelf: target.value})
        )
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/searchbook" render={()=> (
          <SearchBook
            onShelfChange={ target => {
              this.shelfChange(target)
            }}
          />
        )}/>
        <Route exact path="/" render={()=>(
          <ListBooks
            books={this.state.books}
            onShelfChange={ target => {
              this.shelfChange(target)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

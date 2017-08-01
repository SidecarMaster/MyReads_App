/*jshint esversion: 6 */

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
      // Object literal shorthand: you can remove those duplicate variables names from object properties if the properties have the same name as the variables being assigned to them
      this.setState({ books })
      //console.log(this.state.books)
    }).catch( () =>
      alert("Error when fetching data")
    )
  }

  shelfChange = (book, target) => {
    // update state at the server
    BooksAPI.update({id: target.id}, target.value).then(e => {
      console.log(e)
    }).catch( () =>
      alert("Error when updating shelf")
    )

    // update state locally
    this.setState( prevState => {

      // Destructuring: books is a property of prevState
      const { books } = prevState

      // check if the target is currently in the shelves
      const hasTarget = books.find( book => (
        book.id === target.id
      ))

      // process the target depending on hasTarget value
      if (hasTarget) {
        // This one is a function, which alters the shelf if the target is currently in the shelves
        books.filter(book => book.id===target.id)[0].shelf = target.value
      } else {
        // This one returns a state object: {prevState.books: newState.books}
        return {
          // Used spread operator from ES6 here. Could also use concat() to combine two arrays
          books: [
            // Generate the new book object
            // The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object.
             ...books, Object.assign({}, book, {shelf: target.value})
           ]
        }
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <ListBooks
            books={this.state.books}
            onShelfChange={this.shelfChange}
          />
        )}/>
        <Route path="/searchbook" render={()=> (
          <SearchBook
            books={this.state.books}
            onShelfChange={this.shelfChange}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

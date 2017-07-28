import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends React.Component {
  state = {
    query: '',
    searchReturn: []
  }

  updateQuery = query => {
    const queryTrim = query.trim()
    this.setState({ query: queryTrim })
    if (queryTrim !== '') {
      // Note that setState is asynchronous. Inside one function (updateQuery) you use setState and other functions, then the setState will only be executed after the “other functions” finished executing. And this could result in your API calls always executed based on the previous State. Therefore use .search(query, 5) instead of .search(this.state.query)
      BooksAPI.search(queryTrim, 5).then( searchReturn => (
        this.setState({searchReturn: searchReturn})
      ))
    } else {
      this.setState({searchReturn: []})
    }
  }

  render () {
    const { query, searchReturn } = this.state
    const { onShelfChange } = this.prop

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */
            }
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={ event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchReturn.map( response => (
              <li key={response.id}>
                <Book
                  book={response}
                  onShelfChange={onShelfChange}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook;

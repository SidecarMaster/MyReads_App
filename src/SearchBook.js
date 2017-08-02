/*jshint esversion: 6 */

import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash';

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends React.Component {

  state = {
    query: '',
    searchReturn: []
  }

  /*
   * componentWillReceiveProps() is invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare this.props and nextProps and perform state transitions using this.setState() in this method.
   * Note that React may call this method even if the props have not changed, so make sure to compare the current and next values if you only want to handle changes. This may occur when the parent component causes your component to re-render.
   * React doesn't call componentWillReceiveProps with initial props during mounting. It only calls this method if some of component's props may update. Calling this.setState generally doesn't trigger componentWillReceiveProps.
   */
  // This code checks when the props passed in - books - changed, you update the searchReturn with the changed book
  componentWillReceiveProps =({ books }) => {
    const clonedResults = _.cloneDeep(this.state.searchReturn)
    const theObject=_.intersectionBy(books, clonedResults, "id")
    const theOthers=_.differenceBy(clonedResults, theObject, "id")
    this.setState({ searchReturn: [...theObject, ...theOthers] })
  }

  updateQuery = query => {
    const queryTrim = query.trim()
    this.setState({ query: queryTrim })
    this.debounceSearch(queryTrim)
  }

  // The debounce function will execute BooksAPI.search after 300 milliseconds.
  debounceSearch = _.debounce(queryTrim => {
    if (queryTrim !== '') {
      /* Don't use .search(this.state.query).
       * Note that setState is asynchronous. Inside one function (updateQuery) you use setState and other functions, then the setState will only be executed after the “other functions” finished executing. And this could result in your API calls always executed based on the previous State.
       */
      BooksAPI.search(queryTrim, 20).then( resp =>
        {
          // this step makes sure that if response is undefined or null, that searchReturn will still be an array - [] - and the app won't broke
          let searchReturn=[]
          if (Array.isArray(resp)) {
            // this step will eliminate the books that have the same ids or titles with those currently on the book shelves
            // searchReturn = _.differenceBy(_.differenceBy(resp, this.props.books, "id"), this.props.books, "title")

            // This code checks when the search results return, if any of the result has intersection with the props - books, then use the book currently in the library to replace the one in the search results
            const theObject=_.intersectionBy(this.props.books, resp, "id")
            const theOthers=_.differenceBy(resp, theObject, "id")
            searchReturn=[...theObject, ...theOthers]
          }
          this.setState({searchReturn})
          // console.log(searchReturn)
        }
      )
    } else {
      this.setState({searchReturn: []})
    }
  }, 300)

  onShelfChangeResp = (book, target) => {
    this.setState( prevState => prevState.searchReturn.filter(book => book.id===target.id)[0].shelf = target.value)
  }

  render () {
    const { query, searchReturn } = this.state
    const { onShelfChange } = this.props

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
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
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

SearchBook.propTypes = {
  onShelfChange: PropTypes.func.isRequired
}

export default SearchBook;

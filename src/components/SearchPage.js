// import React, {Component}
import React, {Component} from 'react';
// import Link from React Route Dom
import { Link } from 'react-router-dom';

import Book from './Book';
// import BooksAPI
import * as BooksAPI from '../BooksAPI';

class SearchPage extends Component {
  state = {
    query: '',
    bookSearch: []
  }

  updateQuery = (query) => {
    this.setState({ 
      query: query
    })
    this.updateBookSearch(query);
  }
 updateBookSearch = (query) => {
  if (query) {
  BooksAPI.search(query).then((bookSearch) => {
    if (bookSearch.error) {
      this.setState({ bookSearch: [] });
    } else {
      const result = bookSearch.map(book => {
        const existingBook = this.props.books.find(b => b.id === book.id)
        if (existingBook) {
          book.shelf = existingBook.shelf 
        }
        return book
      })
   this.setState({ bookSearch: result }) 
    }
  })
  } else {
    this.setState({ bookSearch: [] });
  }
}


  render () {
    const { bookSearch } = this.state
    return (
    <div className="search-books">
            <div className="search-books-bar">
      
            <Link
             to="/"
            className="close-search"
            >Close</Link>

              <div className="search-books-input-wrapper">
                <input type="text"
                 placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>

            </div>

            <div className="search-books-results">


              <ol className="books-grid">
                {
                // this.state.bookSearch.map(bookSearch => {
                     //let shelf="none":
                   /* this.props.books.map(book => (
                     book.id === bookSearch.id ? 
                   
                    ''  
                      )); 
                    return ( */ 
                    <li key={bookSearch.id}>
                    <Book 
                    book={bookSearch}
                    moveShelf={this.props.moveShelf}
                    //presentShelf={shelf}
                    //shelf={book.shelf}
                    /> 

                    </li>
                  })
                }
              </ol>

            </div>
          </div>  
    );
  }
}

export default SearchPage; 
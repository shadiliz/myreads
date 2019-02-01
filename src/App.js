import React from 'react';
// import Route from React Route Dom
import { Route } from 'react-router-dom';
import SearchPage from "./components/SearchPage";
import MainPage from "./components/MainPage";

 import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

 
  
    moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

     BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }
  

  render() {
    return (
     <div className="app">

      <Route exact path="/" render={() => (
      <MainPage
      books={this.state.books}
      moveShelf={this.moveShelf}
      /> 
        )} />
     
    <Route path="/search" render={() => (
     <SearchPage
     books={this.state.books}
      moveShelf={this.moveShelf} 
        /> 
        )} />
      </div>
    )
  }
}

export default BooksApp

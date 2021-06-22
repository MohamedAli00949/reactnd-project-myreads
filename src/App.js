import React from 'react'
import Books from './Books'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    book: {},
  }

  /**
   * This component is responsible for all actions at this app.
   * When this Component is render, It return 3 shelfs of books 
   * When this component is run, componentDidMount lifecycle event and updateSelf function is run.  
   */
  

  // ckeckShelf = (myBook) =>{
  //   const none = document.querySelector('.none-option');
  //   if (myBook.shelf === 'undefined') {
  //     none.setAttribute('selected', '');
  //   }
  // }

  /**
   * this function runs to update shelfs on adding any book to its selected shelf, it checks if the book is already on that shelf.
   */
  updateShelf = (myAddedBook, shelf) => {
    BooksAPI.update(myAddedBook, shelf).then(() => {
      BooksAPI.getAll().then((myBooks) => {
        this.setState({books:myBooks})
      })
    })

  }

  componentDidMount() {
    BooksAPI.getAll().then( (myBooks) => {
      this.setState({ books: myBooks })
    })  
  }

  render() {
    const shelf1 = this.state.books.filter((myBook) =>  myBook.shelf === "currentlyReading");
    const shelf2 = this.state.books.filter((myBook) => myBook.shelf === "wantToRead");
    const shelf3 = this.state.books.filter((myBook) => myBook.shelf === "read");

    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelf1.map( (book) => (
                      <li key={book.id} style={{border: '2px solid rgb(211 189 220)', borderRadius: '25px 45px'}}>
                        <Books
                          myBooks={ this.state.books }
                          myBook={ book }
                          onUpdateShilf={this.updateShelf}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelf2.map( (book) => (
                      <li key={book.id} style={{border: '2px solid rgb(199 230 226)'}}>
                        <Books
                          myBooks={ this.state.books }
                          myBook={ book }
                          onUpdateShilf={this.updateShelf}
                        />
                      </li>
                      ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelf3.map( (book) => (
                      <li key={book.id} style={{border: '2px solid rgb(221 208 208)', margin: '5px', borderRadius: '5% 12%'}}>
                        <Books
                          myBooks={ this.state.books }
                          myBook={ book }
                          onUpdateShilf={this.updateShelf}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
            </div>
            <div className="open-search">
              <Link to='/search' ><button>Add a book</button></Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => 
          <SearchPage 
            myBooks={ this.state.books }
            onUpdateShilf={this.updateShelf}
          />}></Route>
      </div>
      
    )
  }
}

export default BooksApp

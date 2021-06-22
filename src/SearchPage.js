import React from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


class SearchPage extends React.Component {
    static propTypes = {
        myBooks: PropTypes.array.isRequired,
        onUpdateShilf: PropTypes.func.isRequired
    }

    /**
     * This component is responsibale for search page.
     * When the user enter any query, this query is used by searchForBook function that make update for this query then use search function from BooksAPI to return the results.
     * If there is no query or no results for this query the page tell the user 'No Results' and show them the search items. 
     */

    state = {
        searchedBooks: [],
        myBooks: [],
        query: '',
    }

    async componentDidMount() {
        BooksAPI.getAll().then( (books) => {
            this.setState({
                myBooks: books,
            })
        });
    }    

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
    }

    searchForBook = (query) => {
        const { myBooks } = this.state;
        this.updateQuery(query);
        if (query.length !== 0) {
            BooksAPI.search(query, 50).then((searchResults) => {
                if(searchResults && searchResults.length > 0) {
                    searchResults.map((book) => book.shelf = 'none' )
                    myBooks.map((myBook) => {
                        const findIndex = searchResults.findIndex(b => b.id === myBook.id)
                        if (searchResults[findIndex]) {
                            searchResults[findIndex].shelf = myBook.shelf
                        }
                    })
                    this.setState({ searchedBooks: searchResults })
                } else {
                    this.setState({ searchedBooks: [] })
                }
            })
        } else {
            this.setState({ searchedBooks: [] })
        }
    }

    render () {
        const { searchedBooks, query } = this.state;
        const searchItems = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];

        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/' className="close-search" >Close</Link>
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
                                onChange={e => this.searchForBook(e.target.value)}/>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {searchedBooks.length > 0 ? (
                                searchedBooks.map((book) => (
                                <li key={book.id}>
                                    <Books
                                        myBooks={ searchedBooks }
                                        myBook={ book }
                                        onUpdateShilf={this.props.onUpdateShilf}
                                    />
                                </li>
                            ))) : <div>
                                <h2 style={{color: 'red', font: "35px bold cursive", textAlign: 'center'}}>No Results</h2>
                                <p style={{color: 'blue', textAlign: 'center'}}>Please try again</p>
                                
                                <h3 style={{textAlign: 'center', fontSize: "30px"}}>Search Items</h3>

                                <ol className='search-item'>{searchItems.map((item) =>  {return(<li key={item} className='item' onClick={() => {this.searchForBook(item)}}>{item}</li>)})}</ol>
                                </div>}
                        </ol>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default SearchPage
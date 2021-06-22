import React from 'react'
import PropTypes from 'prop-types'
import NoCover from './icons/NoCover.png'


class Books extends React.Component { 
    static propTypes = {
        myBook: PropTypes.object.isRequired,
        myBooks: PropTypes.array.isRequired,
        onUpdateShilf: PropTypes.func.isRequired
    }

    /**
     * This Component to make books at the app.
     * This component works when the user selects the shelf for any book.
     * The default shelf for any book is None option.
     * This component take onUpdateShelf function property to update changes at select options for any book at this app.
     */

    render () {
        const { onUpdateShilf, myBook } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                        style={{ width: 128, height: 193, backgroundImage: `url(${myBook.imageLinks ? myBook.imageLinks.thumbnail : NoCover})` }}></div>
                    <div className="book-shelf-changer">
                        <select 
                            value={myBook.shelf}
                            onChange = {(e) => 
                                onUpdateShilf(myBook, e.target.value)
                            }
                        >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{myBook.title}</div>
                <div className="book-authors">{myBook.authors}</div>
            </div>
        )
    }
}
export default Books

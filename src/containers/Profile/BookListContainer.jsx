import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteThisBook, requestBooks, setListBookVerify} from "../../store/Profile/BookListReducer";
import BookList from "../../components/Profile/MyBooks/BookList/BookList";
import Loader from "../../components/Loader/Loader";


class BookListContainer extends Component {

    componentDidMount() {
        this.props.requestBooks()
    }


    render() {
        return (
            <div>
                {this.props.isFetching?<Loader/>
                    :
                    <BookList deleteBook={this.props.deleteThisBook} requestBooks={this.props.requestBooks} books={this.props.data} verify={this.props.setListBookVerify} />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.BookListReducer.data,
        isFetching: state.BookListReducer.isFetching
    };
}


export default connect(
    mapStateToProps,{requestBooks, setListBookVerify,deleteThisBook}
)(BookListContainer);
import React from 'react';
import {connect} from "react-redux";
import {
    setBookMark,
    bookLikeOff,
    bookLikeOn,
    requestBook,
    saveNewPhoto,
    deleteBookmark,
    requestBookComments,
    setComment,
    buyThisBook,
    setBookVerify,
    deleteThisComment,
    changeThisChapterPosition
} from "../../store/Book/BookReducer";
import Book from "../../components/Book/Book";
import Loader from "../../components/Loader/Loader";
import {deleteThisChapter} from "../../store/Chapter/ChapterReducer";

class BookContainer extends React.Component {

    refreshBook() {
        let id = this.props.id;
        this.props.requestBook(id);
        this.props.requestBookComments(id);
    }

    componentDidMount() {
        this.refreshBook();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id ) {
            this.refreshBook();
        }
    }

    render() {

        return (
            <div>
                {
                    this.props.isFetching ? <Loader /> : null }
                        <Book
                            data={this.props.data}
                            delete={this.props.deleteThisBook}
                            error={this.props.error}
                            isFetching={this.props.isFetching}
                            savePhoto={this.props.saveNewPhoto}
                            noLiked={this.props.bookLikeOff}
                            liked={this.props.bookLikeOn}
                            bookmark={this.props.setBookMark}
                            deleteBookmark={this.props.deleteBookmark}
                            comments={this.props.comments}
                            addComment={this.props.setComment}
                            buyThisBook={this.props.buyThisBook}
                            deleteThisComment={this.props.deleteThisComment}
                            verify={this.props.setChapterVerify}
                            deletedChapter={this.props.deleteThisChapter}
                            changeChapter = {this.props.changeThisChapterPosition}
                        />



            </div>
        );
    }
};
let mapStateToProps = (state) => {
    return {
        data: state.BookReducer.data,
        comments: state.BookReducer.comments,
        error: state.BookReducer.error,
        isFetching: state.BookReducer.isFetching
    }
}


export default connect(mapStateToProps, {setChapterVerify: setBookVerify,
    changeThisChapterPosition,
    deleteThisChapter,
    requestBook,
    saveNewPhoto,
    bookLikeOn,
    bookLikeOff,
    deleteThisComment,
    buyThisBook,
    setBookMark,
    deleteBookmark,
    requestBookComments,
    setComment})(BookContainer)

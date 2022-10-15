import React, {Component} from 'react';
import {connect} from 'react-redux';
import {buyThisBook, requestChapter} from "../../store/Chapter/ChapterReducer";
import Chapter from "../../components/Chapter/Chapter";


class ChapterContainer extends Component {
    componentDidMount() {
        this.props.requestChapter(this.props.props.bookid,this.props.props.chapterid);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.props.chapterid !== prevProps.props.chapterid ) {
            this.props.requestChapter(this.props.props.bookid,this.props.props.chapterid);
        }
    }
    render() {
        return (
            <div>
                <Chapter {...this.props} buyThisBook={this.props.buyThisBook} bookData={this.props.bookData} bookId={this.props.props.bookid} chapterid={this.props.props.chapterid} data={this.props.data} isFetching={this.props.isFetching} error={this.props.error}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        data: state.ChapterReducer.data,
        bookData: state.ChapterReducer.bookData,
        error: state.ChapterReducer.error,
        isFetching: state.ChapterReducer.isFetching
    }
};

export default connect(
    mapStateToProps,{requestChapter,buyThisBook}
)(ChapterContainer);
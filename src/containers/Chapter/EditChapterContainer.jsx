import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditChapter from "../../components/Chapter/EditChapter";
import {requestChapter,saveEditionChapter} from "../../store/Chapter/EditChapterReducer";
import {deleteThisChapter} from "../../store/Chapter/ChapterReducer";



class EditChapterContainer extends Component {
    componentDidMount() {
        this.props.requestChapter(this.props.props.bookid,this.props.props.chapterid);
    }

    render() {
        return (
            <div>

                    <EditChapter bookid={this.props.props.bookid}
                                 chapterid={this.props.props.chapterid}
                                 data={this.props.data}
                                 save={this.props.saveEditionChapter}
                                 deletedChapter={this.props.deleteThisChapter}
                                 error={this.props.error}/>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.EditChapterReducer.data,
        error: state.EditChapterReducer.error,
        isFetching: state.EditChapterReducer.isFetching
    };
}
export default connect(
    mapStateToProps,{saveEditionChapter,requestChapter, deleteThisChapter}
)(EditChapterContainer);
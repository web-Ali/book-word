import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    addTagFunc,
    cleanNewTag,
    delNewTag,
    requestBook,
    requestBooksInfo,
    saveEditionBook
} from "../../store/Book/EditBookReducer";
import EditBook from "../../components/Book/EditBook";
import Loader from "../../components/Loader/Loader";
import { deleteThisBook} from "../../store/Book/BookReducer";



class EditBookContainer extends Component {
    componentDidMount() {
        let id = this.props.id;
        this.props.requestBook(id);
        this.props.requestBooksInfo();
        this.props.cleanNewTag()
    }

    render() {
        return (
            <div>
                {this.props.isFetching ?
                    <Loader/>
                    :
                    <EditBook data={this.props.data}
                              newTags={this.props.newTags}
                              addNewTag={this.props.addTagFunc}
                              bookinfo={this.props.bookInfo}
                              deleteBook={this.props.deleteThisBook}
                              save={this.props.saveEditionBook}
                              cleanNewTag={this.props.cleanNewTag}
                              delNewTag={this.props.delNewTag}
                    />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.EditBookReducer.data,
        newTags: state.EditBookReducer.newTags,
        bookInfo: state.EditBookReducer.bookInfo,
        isFetching: state.EditBookReducer.isFetching

    };
}

export default connect(
    mapStateToProps,{cleanNewTag,addTagFunc,requestBook,requestBooksInfo,saveEditionBook,deleteThisBook,delNewTag}
)(EditBookContainer);
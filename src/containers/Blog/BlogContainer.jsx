import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteThisComment, requestBlog, requestBlogComments, setComment} from "../../store/Blog/UserBlogReducer";
import Blog from "../../components/Blog/Blog";


class BlogContainer extends Component {
    refreshBlog() {
        let id = this.props.id;
        this.props.requestBlog(id);
        this.props.requestBlogComments(id);
    }

    componentDidMount() {
        this.refreshBlog();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id ) {
            this.refreshBlog();
        }
    }
    render() {
        return (
            <div>
                <Blog
                    data={this.props.data}
                    isFetching={this.props.isFetching}
                    comments={this.props.comments}
                    addComment={this.props.setComment}
                    deleteThisComment={this.props.deleteThisComment}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.UserBlogReducer.data,
        comments: state.UserBlogReducer.comments,
        isFetching: state.UserBlogReducer.isFetching
    };
}

export default connect(
    mapStateToProps, {requestBlog,requestBlogComments,setComment,deleteThisComment}
)(BlogContainer);
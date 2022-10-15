import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, getUserBooks, requestSubscribe, requestUserBlogs} from "../../store/User/UserReducer";
import User from "../../components/User/User";
import {
    addProfileCommentFunc,
    deleteProfileCommentFunc,
    requestProfileComment
} from "../../store/Profile/ProfileReducer";



class UserContainer extends Component {
    refreshUser() {
        let username = this.props.username;
        this.props.getUser(username)
        this.props.getUserBooks(username)
        this.props.requestProfileComment(username);
        this.props.requestUserBlogs(username);
    }


    componentDidMount() {
        this.refreshUser()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.username !== prevProps.username ) {
            this.refreshUser();
        }
    }

    render() {
        return (
            <>
                <User
                    data={this.props.data}
                    books={this.props.books}
                    comments={this.props.comments}
                    blogs={this.props.userBlogs}
                    addComment={this.props.addProfileCommentFunc}
                    deleteComment={this.props.deleteProfileCommentFunc}
                    subscribe={this.props.requestSubscribe}
                />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.UserReducer.data,
        books: state.UserReducer.books,
        userBlogs: state.UserReducer.userBlogs,
        comments: state.ProfileReducer.comments,
        isFetching: state.UserReducer.isFetching,
    };
}

export default connect(
    mapStateToProps, {
        getUser,
        getUserBooks,
        deleteProfileCommentFunc,
        requestProfileComment,
        addProfileCommentFunc,
        requestUserBlogs,
        requestSubscribe
    }
)(UserContainer);
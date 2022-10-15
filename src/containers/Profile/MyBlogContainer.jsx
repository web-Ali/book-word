import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    addBlogFunc,
    delBlogFunc,
    requestThemes,
    requestUserBlogs,
    updateBlogFunc
} from "../../store/Profile/ProfileBlogReducer";
import MyBlog from "../../components/Profile/MyBlog/MyBlog";

function mapStateToProps(state) {
    return {
        isFetching: state.BlogReducer.isFetching,
        userBlogs: state.BlogReducer.userBlogs,
        themes: state.BlogReducer.themes
    };
}


class MyBlogContainer extends Component {
    componentDidMount() {
        this.props.requestThemes();
        this.props.requestUserBlogs(localStorage.getItem('username'));
    }

    render() {
        return (
            <>
                <MyBlog
                    addBlog={this.props.addBlogFunc}
                    deleteBlog={this.props.delBlogFunc}
                    blogs={this.props.userBlogs}
                    themes={this.props.themes}
                    updateBlog={this.props.updateBlogFunc}
                />
            </>
        );
    }
}

export default connect(
    mapStateToProps, {updateBlogFunc,requestThemes,requestUserBlogs,delBlogFunc,addBlogFunc}
)(MyBlogContainer);
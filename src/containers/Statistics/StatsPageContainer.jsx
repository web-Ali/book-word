import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestBooks} from "../../store/Profile/BookListReducer";
import Stats from "../../pages/Stats/Stats";

function mapStateToProps(state) {
    return {
        data: state.BookListReducer.data,
    };
}

class StatsPageContainer extends Component {
    componentDidMount() {
        this.props.requestBooks()
    }

    render() {
        return (
            <Stats bookList={this.props.data} />
        );
    }
}

export default connect(
    mapStateToProps,{requestBooks}
)(StatsPageContainer);
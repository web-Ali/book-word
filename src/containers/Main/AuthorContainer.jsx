import React from 'react';
import {connect} from "react-redux";
import {requestAuthors} from "../../store/Main/MainReducer";
import AuthorSlider from "../../components/Main/AuthorSlider";

class AuthorContainer extends React.Component {

    componentDidMount() {
        this.props.requestAuthors();
    }

    render() {


        return (
            <AuthorSlider type={this.props.type} data={this.props.authors} isFetching={this.props.isFetching}/>
        );
    }
};
let mapStateToProps = (state) => {
    return {
        authors: state.PopularReducer.authors,
        isFetching: state.PopularReducer.isFetching
    }
}


export default connect(mapStateToProps, { requestAuthors})(AuthorContainer)

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestContinueRead} from "../../store/Main/MainReducer";
import ContinueReadComponent from "../../components/Main/ContinueReadComponent";

function mapStateToProps(state) {
    return {
        data: state.PopularReducer.continueRead
    };
}


class ContinueRead extends Component {
    componentDidMount() {
        this.props.requestContinueRead();
    }

    render() {
        return (
            <ContinueReadComponent  data={this.props.data}/>
        );
    }
}

export default connect(
    mapStateToProps, {requestContinueRead}
)(ContinueRead);
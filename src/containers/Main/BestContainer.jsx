import React from 'react';
import {connect} from "react-redux";
import {
    requestBestsellers
} from "../../store/Main/MainReducer";
import "./slider.scss";

import Best from "../../components/Main/Best";

class BestContainer extends React.Component {

    componentDidMount() {
        this.props.requestBestsellers();
    }

    render() {
        return (
            <>
                <Best  data={this.props.bestsellers} isFetching={this.props.isFetching}/>
            </>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        isFetching: state.PopularReducer.isFetching,
        bestsellers: state.PopularReducer.popular
    }
}


export default connect(mapStateToProps, {requestBestsellers})(BestContainer)

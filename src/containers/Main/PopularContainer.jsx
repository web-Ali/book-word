import React from 'react';
import {connect} from "react-redux";
import { requestPopular
} from "../../store/Main/MainReducer";
import "./slider.scss";

import Popular from "../../components/Main/Popular";

class PopularContainer extends React.Component {

    componentDidMount() {
        this.props.requestPopular();
    }

    render() {
        return (
            <>
                <Popular  data={this.props.popular} isFetching={this.props.isFetching}/>
            </>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        isFetching: state.PopularReducer.isFetching,
        popular: state.PopularReducer.popular
    }
}


export default connect(mapStateToProps, {requestPopular})(PopularContainer)

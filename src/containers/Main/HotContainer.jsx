import React from 'react';
import {connect} from "react-redux";
import { requestHot
} from "../../store/Main/MainReducer";
import "./slider.scss";

import Hot from "../../components/Main/Hot";

class HotContainer extends React.Component {

    componentDidMount() {
        this.props.requestHot();
    }

    render() {
        return (
            <>
                <Hot  data={this.props.hot} isFetching={this.props.isFetching}/>
            </>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        isFetching: state.PopularReducer.isFetching,
        hot: state.PopularReducer.hot
    }
}


export default connect(mapStateToProps, {requestHot})(HotContainer)

import React from 'react';
import {connect} from "react-redux";
import {requestMostReaded} from "../../store/Main/MainReducer";
import "./slider.scss";

import Top15 from "../../components/Main/Top15";

class Top15Container extends React.Component {

    componentDidMount() {
        this.props.requestMostReaded();
    }

    render() {
        return (
            <div className='top15main'>
                <Top15  data={this.props.mostreaded} isFetching={this.props.isFetching}/>
            </div>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        isFetching: state.PopularReducer.isFetching,
        mostreaded: state.PopularReducer.mostreaded,
    }
}


export default connect(mapStateToProps, {requestMostReaded})(Top15Container)

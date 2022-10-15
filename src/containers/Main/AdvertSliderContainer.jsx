import React from 'react';
import {connect} from "react-redux";
import {
    requestBasicAdvertising
} from "../../store/Main/MainReducer";
import "./slider.scss";

import AdvertSlider from "../../components/Main/AdvertSlider";

class AdvertSliderContainer extends React.Component {

    componentDidMount() {
        this.props.requestBasicAdvertising();
    }

    render() {
        return (
            <div className='basicAdvertising'>
                <AdvertSlider  data={this.props.basicAdvertising} isFetching={this.props.isFetching}/>
            </div>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        isFetching: state.PopularReducer.isFetching,
        basicAdvertising: state.PopularReducer.basicAdvertising
    }
}


export default connect(mapStateToProps, {requestBasicAdvertising})(AdvertSliderContainer)

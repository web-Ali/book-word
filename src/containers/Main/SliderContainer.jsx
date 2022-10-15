import React from 'react';
import {connect} from "react-redux";
import {
    requestPopular,
    requestBestsellers,
    requestHot,
    requestBasicAdvertising,
    requestMostReaded
} from "../../store/Main/MainReducer";
import MainSlider from "../../components/Main/MainSlider";

class SliderContainer extends React.Component {

    componentDidMount() {
        if (this.props.type === 'hot') {
            this.props.requestHot();
        } else if (this.props.type === 'popular') {
            this.props.requestPopular();
        } else if (this.props.type === 'bestsellers') {
            this.props.requestBestsellers();
        } else if (this.props.type === 'basicAdvertising') {
            this.props.requestBasicAdvertising();
        } else if (this.props.type === 'mostreaded') {
            this.props.requestMostReaded();
        }

    }

    render() {
        return (
            <MainSlider type={this.props.type} data={[...this.props[this.props.type],...this.props[this.props.type],...this.props[this.props.type]]} isFetching={this.props.isFetching}/>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        hot: state.PopularReducer.hot,
        popular: state.PopularReducer.popular,
        bestsellers: state.PopularReducer.bestsellers,
        isFetching: state.PopularReducer.isFetching,
        mostreaded: state.PopularReducer.mostreaded,
        basicAdvertising: state.PopularReducer.basicAdvertising
    }
}


export default connect(mapStateToProps, {requestMostReaded, requestPopular, requestBestsellers, requestHot, requestBasicAdvertising})(SliderContainer)

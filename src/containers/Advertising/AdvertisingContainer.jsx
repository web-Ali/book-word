import React, {Component} from 'react';
import {connect} from 'react-redux';
import {threeAdvertising} from "../../store/Advertising/AdvertisingReducer";
import ThreeAdversiting from "../../components/Adversiting/ThreeAdversiting";

function mapStateToProps(state) {
    return {
        dataThree: state.AdvertisingReducer.threeAdvertisingData,
        isFetching: state.AdvertisingReducer.isFetching
    };
}


class AdvertisingContainer extends Component {
    componentDidMount() {
        this.props.threeAdvertising()
    }

    render() {
        return (
            <ThreeAdversiting
                type={this.props.type}
                data={this.props.dataThree}
                isFetching={this.props.isFetching}
            />);
    }
}

export default connect(mapStateToProps, {threeAdvertising})(AdvertisingContainer);
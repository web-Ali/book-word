import React, {Component} from 'react';
import {connect} from 'react-redux';
import Registration from "../../components/Registration/Registration";
import {clearError, postRegistration} from "../../store/Auth/AuthReducer";



class RegistrationContainer extends Component {
    componentDidMount() {
        this.props.clearError();
    }

    render() {
        return (

            <div>
                    <Registration is_registered={this.props.is_registered} registration={this.props.postRegistration} error={this.props.error}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.AuthReducer.isFetching,
        is_registered: state.AuthReducer.is_registered,
        error: state.AuthReducer.error
    };
}

export default connect(
    mapStateToProps,{postRegistration,clearError}
)(RegistrationContainer);
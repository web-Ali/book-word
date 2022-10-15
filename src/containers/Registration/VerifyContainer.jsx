import React, {Component} from 'react';
import {connect} from 'react-redux';
import {verifyAccount} from "../../store/Auth/AuthReducer";
import Verify from "../../components/Registration/Verify";

import {withTranslation} from 'react-i18next';
import {compose} from "redux";

class VerifyContainer extends Component {

    state = {
        verify: false,
        message: ''
    }

    componentDidMount() {
        this.props.verifyAccount(this.props.code)
            .then(res => {

                if (res == 200) {
                    this.setState({message: this.props.t('Your account has been activated. You can enter the service using your login and password!')})
                    this.setState({verify: true})
                } else {
                    this.setState({message: this.props.t('An error occurred while validating. Please try again')})
                }
            })

    }

    render() {


        return <Verify verify={this.state.verify} message={this.state.message}/>;
    }
}

export default compose(
    withTranslation(),
    connect(
        null, {verifyAccount}
    ))(VerifyContainer);
import React, {Component} from 'react';
import Header from "../../components/Header/Header";
import {withRouter} from "react-router-dom";
import {compose} from 'redux';
import {READER_ROUTER} from "../../routing/consts";
import {connect} from "react-redux";
import {requestMyProfile, requestNewNotifications} from "../../store/Profile/ProfileReducer";

class HeaderContainer extends Component {


    componentDidMount() {
        if (localStorage.getItem('username')){
            this.props.requestMyProfile(localStorage.getItem('username'))
            this.props.requestNewNotifications()
            this.notifCheck =  setInterval(() => this.props.requestNewNotifications(), 60000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.notifCheck);
    }

    render() {

        if (this.props.location.pathname.toLowerCase().includes(READER_ROUTER)){
            return null
        }
        return (
            <div>
                <Header newNotifications={this.props.newNotifications} data={this.props.data}/>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.ProfileReducer.data,
        newNotifications: state.ProfileReducer.newNotifications,
    };
}

export default compose(
    connect(mapStateToProps, {requestMyProfile,requestNewNotifications}),
    withRouter
)(HeaderContainer)


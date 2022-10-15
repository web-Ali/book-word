import {Component} from "react";
import {connect} from "react-redux";
import {clearError, postLogin} from "../../store/Auth/AuthReducer";
import React from "react";
import Login from "../../components/Registration/Login";

class LoginContainer extends Component {

    componentDidMount() {
        this.props.clearError();
        if (this.props?.props){
            const formData = new FormData();
            formData.append('username', this.props.props.Login);
            formData.append('password', this.props.props.Password);
            this.props.postLogin(formData);
        }
    }

    render() {
        return (
            <div>
                <Login postLogin={this.props.postLogin} er={this.props.error} isFetching={this.props.isFetching}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        error: state.AuthReducer.error,
        isFetching: state.AuthReducer.isFetching
    }
}

export default connect(mapStateToProps, { postLogin,clearError})(LoginContainer)
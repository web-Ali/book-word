import React from 'react';
import {connect} from 'react-redux';
import {
    addProfileCommentFunc, deleteProfileCommentFunc,
    requestMyProfile, requestProfileComment,
    saveNewBackgroundPhoto,
    saveNewProfilePhoto,
    updateProfile
} from "../../store/Profile/ProfileReducer";
import Profile from "../../components/Profile/Profile";
import {compose} from "redux";
import {Redirect, withRouter} from "react-router-dom";



class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.requestMyProfile(localStorage.getItem('username'));
        this.props.requestProfileComment(localStorage.getItem('username'));
    }

    render() {
        if (this.props.location.pathname === '/profile'){
            return <Redirect to="/profile/info"  />
        }
        return (
            <div>
                <Profile
                    updateProfile={this.props.updateProfile}
                    requestUser={this.props.requestMyProfile}
                    saveBg={this.props.saveNewBackgroundPhoto}
                    data={this.props.data}
                    isFetching={this.props.isFetching}
                    savePhoto={this.props.saveNewProfilePhoto}
                    comments={this.props.comments}
                    addComment={this.props.addProfileCommentFunc}
                    deleteComment={this.props.deleteProfileCommentFunc}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.ProfileReducer.data,
        comments: state.ProfileReducer.comments,
        isFetching: state.ProfileReducer.isFetching
    };
}

export default compose(
    connect(mapStateToProps,{
        updateProfile,
        requestMyProfile,
        saveNewProfilePhoto,
        saveNewBackgroundPhoto,
        deleteProfileCommentFunc,
        requestProfileComment,
        addProfileCommentFunc

    }),
    withRouter
)(ProfileContainer);
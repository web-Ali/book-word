import React, {Component} from 'react';
import {connect} from 'react-redux';
import Moderation from "../../components/Profile/Moderation/Moderation";
import {requestChapterMod, setModerationVerify} from "../../store/Profile/ModerationReducer";

function mapStateToProps(state) {
    return {
        data: state.ModerationReducer.data,
        isFetching: state.ModerationReducer.isFetching,
        error: state.ModerationReducer.error,
    };
}

class ModerationContainer extends Component {
    componentDidMount() {
        this.props.requestChapterMod();
    }

    render() {
        return (
            <div>
                <Moderation data={this.props.data}  error={this.props.error} verify={this.props.setModerationVerify}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, { requestChapterMod,setModerationVerify}
)(ModerationContainer);
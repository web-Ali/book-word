import React, {Component} from 'react';
import {connect} from 'react-redux';
import MyLibrary from "../../components/Profile/MyLibrary/MyLibrary";
import {requestBookmark, requestPurchased} from "../../store/Profile/MyLibraryReducer";



class MyLibraryContainer extends Component {
    componentDidMount() {
        this.props.requestBookmark();
        this.props.requestPurchased();
    }

    render() {

        return (
            <div>
                <MyLibrary dataPurchased={this.props.dataPurchased} data={this.props.data} error={this.props.error} isFetching={this.props.isFetching}/>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.MyLibraryReducer.data,
        dataPurchased: state.MyLibraryReducer.dataPurchased,
        error: state.MyLibraryReducer.error,
        isFetching: state.MyLibraryReducer.isFetching
    };
}

export default connect(
    mapStateToProps,{requestBookmark, requestPurchased}
)(MyLibraryContainer);
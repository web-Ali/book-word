import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTagFunc, cleanNewTag, delNewTag, requestBooksInfo} from "../../store/Profile/AddBookReducer";
import AddBook from "../../components/Profile/MyBooks/AddBook/AddBook";
import Loader from "../../components/Loader/Loader";



class AddBookContainer extends Component {
    componentDidMount() {
        this.props.requestBooksInfo();
    }

    render() {
        return (
            <div>
                {this.props.isFetching ?
                    <Loader/>
                    :
                    <AddBook props={this.props.data}
                             cleanNewTag={this.props.cleanNewTag}
                             delNewTag={this.props.delNewTag}
                             newTags={this.props.newTags}
                             addTag={this.props.addTagFunc}/>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.AddBookReducer.data,
        newTags: state.AddBookReducer.newTags,
        isFetching: state.AddBookReducer.isFetching
    };
}

export default connect(
    mapStateToProps, {requestBooksInfo,addTagFunc,delNewTag,cleanNewTag}
)(AddBookContainer);
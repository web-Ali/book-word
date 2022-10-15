import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddChapter from "../../components/Chapter/AddChapter";

function mapStateToProps(state) {
    return {};
}

class AddChapterContainer extends Component {

    render() {
        return (
            <div>
                <AddChapter bookid={this.props.bookid}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(AddChapterContainer);
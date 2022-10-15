import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestStatistics} from "../../store/Statistics/StatisticsReducer";
import BookStats from "../../components/Book/BookStats";

function mapStateToProps(state) {
    return {
        stats: state.StatisticsReducer.stats,
        isFetching: state.StatisticsReducer.isFetching,
        error: state.StatisticsReducer.error,

    };
}

class StatisticsContainer extends Component {
    componentDidMount() {
        this.props.requestStatistics(this.props.start, this.props.end, this.props.book)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.start !== prevProps.start || this.props.end !== prevProps.end || this.props.book !== prevProps.book ) {
            this.props.requestStatistics(this.props.start, this.props.end, this.props.book)
        }
    }

    render() {
        return (
            <div>
                <BookStats stats={this.props.stats} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,{requestStatistics}
)(StatisticsContainer);
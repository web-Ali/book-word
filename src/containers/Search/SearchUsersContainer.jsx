import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestUsersSearch} from "../../store/Search/SearchReducer";
import SearchUsers from "../../components/Search/SearchUsers";


class SearchUsersContainer extends Component {
    searchItemBuild(sort = 'username', search, page = 1) {

        this.props.requestUsersSearch(
            'ordering=' + sort +
            '&search=' + ((search && search !== '0') ? search : '') +
            '&page=' + page
        )
    }

    componentDidMount() {
        if (this.props.params.sort
            || this.props.params.search) {
            this.searchItemBuild(this.props.params.sort,
                this.props.params.search
            )
        } else {
            this.searchItemBuild()
        }
        // console.log(this.props.params)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)) {
            this.searchItemBuild(this.props.params.sort,
                this.props.params.search)
        }
    }

    render() {
        return (
            <div>
                <SearchUsers searchText={this.props.params.search}
                             searchNext={this.props.requestUsersSearch}
                             requestSearch={this.searchItemBuild}
                             searchResult={this.props.search}
                             isFetching={this.props.isFetching}
                             />
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        search: state.SearchReducer.searchUsersResult,
        isFetching: state.SearchReducer.isFetching,
    };
}

export default connect(
    mapStateToProps, {requestUsersSearch}
)(SearchUsersContainer);
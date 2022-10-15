import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestBlogInfoSearch, requestBlogSearch} from "../../store/Search/SearchReducer";
import SearchBlog from "../../components/Search/SearchBlog";





class SearchBlogContainer extends Component {
    searchItemBuild(themes,search, page=1) {

        this.props.requestBlogSearch(
            'theme='+( (themes && !!+themes !== false) ? themes : '')+
            '&search='+((search && search !== '0') ? search : '')+
            '&ordering='+
            '&s=3'+
            '&page=' + page
        )
    }

    componentDidMount() {
        this.props.requestBlogInfoSearch();
        if (this.props.params.themes
            || this.props.params.search) {
            this.searchItemBuild(this.props.params.themes,
                this.props.params.search
            )
        }else{
            this.searchItemBuild()
        }
        // console.log(this.props.params)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)) {
            this.searchItemBuild(this.props.params.themes,
                this.props.params.search)
        }
    }
    render() {
        return (
            <>
                <SearchBlog searchText={this.props.params.search} searchNext={this.props.requestBlogSearch} requestSearch={this.searchItemBuild} search={this.props.search}
                             isFetching={this.props.isFetching} themes={this.props.themes}/>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        search: state.SearchReducer.searchBlogResult,
        themes: state.SearchReducer.blogThemes,
        isFetching: state.SearchReducer.isFetching,
    };
}

export default connect(
    mapStateToProps,{requestBlogInfoSearch,requestBlogSearch}
)(SearchBlogContainer);
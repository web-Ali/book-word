import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchBooks from "../../components/Search/SearchBooks";
import {requestBooksInfoSearch, requestBookSearch} from "../../store/Search/SearchReducer";


class SearchBooksContainer extends Component {

    searchItemBuild(form, genge, search, tags, paid, page=1) {
        if (+paid === 1){
            paid= 'true';
        }
        else if(+paid===2){
            paid = 'false'
        }else{
            paid =''
        }

        let tagsList
        if(tags && +tags !== 0){
            tagsList = ''
            tags.split('-').map(a =>{
                tagsList= tagsList + '&tags='+a
            })
        }else{
            tagsList = '&tags='
        }

        this.props.requestSearch(
            'form='+( (form && !!+form !== false) ? form : '')+
            '&paid='+paid+
            '&genre='+((genge && !!+genge !== false) ? genge : '')+
            tagsList+
            '&search='+((search && search !== '0') ? search : '')+
            '&ordering'+
            '&s=35  '+
            '&page=' + page +
            '&lang=' + localStorage.getItem('i18nextLng')
        )
    }

    componentDidMount() {
        this.props.requestBooksInfoSearch();
        if (this.props.params.form
            || this.props.params.genre
            || this.props.params.search
            || this.props.params.tags
            || this.props.params.paid
        ) {
            this.searchItemBuild(this.props.params.form,
                this.props.params.genre,
                this.props.params.search,
                this.props.params.tags,
                this.props.params.paid
            )
        }else{
            this.searchItemBuild()
        }
        // console.log(this.props.params)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)) {
            this.searchItemBuild(this.props.params.form,
                this.props.params.genre,
                this.props.params.search,
                this.props.params.tags,
                this.props.params.paid,
                this.props.params.lang
            )
        }
    }

    render() {
        return (
            <div>
                <SearchBooks searchNext={this.props.requestSearch} requestSearch={this.searchItemBuild} search={this.props.search}
                             isFetching={this.props.isFetching} bookInfo={this.props.bookInfo}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        search: state.SearchReducer.searchBookResult,
        bookInfo: state.SearchReducer.bookInfo,
        isFetching: state.SearchReducer.isFetching,
    };
}

export default connect(
    mapStateToProps, {requestSearch: requestBookSearch, requestBooksInfoSearch}
)(SearchBooksContainer);
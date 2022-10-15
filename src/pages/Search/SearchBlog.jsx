import React from 'react';
import SearchBlogContainer from "../../containers/Search/SearchBlogContainer";

const SearchBlog = (props) => {
    return (
        <div>
            <SearchBlogContainer params={props.match.params} />
        </div>
    );
};

export default SearchBlog;
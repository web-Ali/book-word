import React from 'react';
import SearchUsersContainer from "../../containers/Search/SearchUsersContainer";

const SearchUser = (props) => {
    return (
        <div>
            <SearchUsersContainer params={props.match.params} />
        </div>
    );
};

export default SearchUser;
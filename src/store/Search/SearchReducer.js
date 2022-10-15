import {getBooksInfo} from "../../http/booksAPI";
import {searchBlogs, searchBooks, searchUsers} from "../../http/searchAPI";
import {getBlogThemes} from "../../http/blogAPI";

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_BOOK_SEARCH = 'SET_BOOK_SEARCH';
const SET_BLOG_SEARCH = 'SET_BLOG_SEARCH';
const SET_USERS_SEARCH = 'SET_USERS_SEARCH';
const SET_BOOK_INFO = 'SET_BOOK_INFO';
const SET_BLOG_INFO = 'SET_BLOG_INFO';


let initialState = {
    searchBookResult: {
        count: 0,
        next: null,
        previous: null,
        result:[]
    },
    searchBlogResult: {
        count: 0,
        next: null,
        previous: null,
        results:[]
    },
    searchUsersResult: {
        count: 0,
        next: null,
        previous: null,
        results:[]
    },
    bookInfo: {
        bookForm:[],
        genres:[],
        tags:[],
    },
    blogThemes: [],
    isFetching: false
};

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOK_SEARCH: {
            return {...state, searchBookResult: action.data}
        }
        case SET_BLOG_SEARCH: {
            return {...state, searchBlogResult: action.data}
        }
        case SET_USERS_SEARCH: {
            return {...state, searchUsersResult: action.data}
        }
        case SET_BOOK_INFO: {
            return {...state, bookInfo: action.bookInfo}
        }
        case SET_BLOG_INFO: {
            return {...state, blogThemes: action.blogThemes}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}


export const setBookSearchData = (data) => ({type: SET_BOOK_SEARCH, data});
export const setBlogSearchData = (data) => ({type: SET_BLOG_SEARCH, data});
export const setUsersSearchData = (data) => ({type: SET_USERS_SEARCH, data});
export const setBookInfoSearch = (bookInfo) => ({type: SET_BOOK_INFO, bookInfo});
export const setBlogInfoSearch = (blogThemes) => ({type: SET_BLOG_INFO, blogThemes});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});


export const requestBooksInfoSearch = () =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getBooksInfo()
            dispatch(setBookInfoSearch(data));
            dispatch(toggleIsFetching(false));
        }catch (e) {
            console.log(e.response);
            dispatch(toggleIsFetching(false));
        }
    }
}
export const requestBlogInfoSearch = () =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getBlogThemes()
            dispatch(setBlogInfoSearch(data));
            dispatch(toggleIsFetching(false));
        }catch (e) {
            console.log(e.response);
            dispatch(toggleIsFetching(false));
        }
    }
}


export const requestBookSearch = (search) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await searchBooks(search);
            dispatch(setBookSearchData(data));
            dispatch(toggleIsFetching(false));

        }
        catch (e) {
            console.log(e.response);
            dispatch(toggleIsFetching(false));
        }
    }
};
export const requestBlogSearch = (search) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await searchBlogs(search);
            dispatch(setBlogSearchData(data));
            dispatch(toggleIsFetching(false));

        }
        catch (e) {
            console.log(e.response);
            dispatch(toggleIsFetching(false));
        }
    }
};

export const requestUsersSearch = (search) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await searchUsers(search);
            dispatch(setUsersSearchData(data));
            dispatch(toggleIsFetching(false));

        }
        catch (e) {
            console.log(e.response);
            dispatch(toggleIsFetching(false));
        }
    }
};

export default SearchReducer
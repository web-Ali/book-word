import {getMyProfile, getProfileComment, saveBackgroundPhoto, subscribe, updateProfileQuery} from "../../http/userAPI";
import {getAllBooksUser} from "../../http/booksAPI";
import {getUserBlogs} from "../../http/blogAPI";


const SET_USER = 'SET_USER';
const SET_USER_BOOKS = 'SET_USER_BOOKS';
const SET_USER_BLOGS = 'SET_USER_BLOGS';

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {
    data: {},
    books: [],
    userBlogs: [],
    isFetching: true
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {...state, data: action.user}
        }
        case SET_USER_BOOKS: {
            return {...state, books: action.books}
        }
        case SET_USER_BLOGS: {
            return {...state, userBlogs: action.blogs}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}



export const setUser = (user) => ({type: SET_USER, user});
export const setUserBooks = (books) => ({type: SET_USER_BOOKS, books});
export const setUserBlogs = (blogs) => ({type: SET_USER_BLOGS, blogs});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const getUser = (username) =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getMyProfile(username)
            dispatch(toggleIsFetching(false));
            dispatch(setUser(data));
        }catch (e) {
            console.log(e.response)
        }

    }
}
export const getUserBooks = (username) =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getAllBooksUser(username)
            dispatch(toggleIsFetching(false));
            dispatch(setUserBooks(data));
        }catch (e) {
            console.log(e.response)
        }

    }
}


export const requestUserBlogs = (username) =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getUserBlogs(username)
            dispatch(toggleIsFetching(false));
            dispatch(setUserBlogs(data));
        }catch (e) {
            console.log(e.response);
        }

    }
}
export const requestSubscribe = (username) =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            await subscribe(username)
            let data = await getMyProfile(username)
            dispatch(toggleIsFetching(false));
            dispatch(setUser(data));;
        }catch (e) {
            console.log(e.response);
        }

    }
}

export default UserReducer;
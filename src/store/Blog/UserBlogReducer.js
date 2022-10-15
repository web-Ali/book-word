import {

} from "../../http/booksAPI";
import {getBlog} from "../../http/blogAPI";
import {
    AddBlogComments,
    deleteBlogComment,
    getBlogComments
} from "../../http/commentAPI";


const SET_BLOG = 'SET_BLOG';
const SET_COMMENTS = 'SET_COMMENTS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {
    data: {
        id: '',
        user: {
            id: '',
        },
        theme: {},
        title: '',
        markdown: '',
        created_at: ''
    },
    comments: [],
    isFetching: true
};

const UserBlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS: {
            return {...state, comments: action.comments}
        }
        case SET_BLOG: {
            return {...state, data: action.blog}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}



export const setBlog = (blog) => ({type: SET_BLOG, blog});
export const setComments = (comments) => ({type: SET_COMMENTS, comments});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});


export const requestBlog = (id) =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getBlog(id)
            dispatch(toggleIsFetching(false));
            dispatch(setBlog(data));
        }
        catch (e) {
            dispatch(toggleIsFetching(false));
        }
    }
}
export const requestBlogComments = (id) =>{
    return async (dispatch) => {
        try {
            let data = await getBlogComments(id)
            dispatch(setComments(data));
        }
        catch (e) {
            console.log(e.response)
        }

    }
}
export const setComment = (id, comment) =>{
    return async (dispatch) => {
        try {

            await AddBlogComments(id, comment)
            let data = await getBlogComments(id)
            dispatch(setComments(data));
        }
        catch (e) {
            console.log(e.response)
        }

    }
}
export const deleteThisComment = (id, bookId) =>{
    return async (dispatch) => {
        try {
            await deleteBlogComment(id)
            let data = await getBlogComments(bookId)
            dispatch(setComments(data));
        }
        catch (e) {
            console.log(e.response)
        }

    }
}


export default UserBlogReducer
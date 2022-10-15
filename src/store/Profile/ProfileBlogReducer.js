import {addBlog, deleteBlog, getBlogThemes, getUserBlogs, updateBlog} from "../../http/blogAPI";

const SET_BLOG_THEME = 'SET_BLOG_THEME';
const SET_USER_BLOGS = 'SET_USER_BLOGS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {
    userBlogs: [],
    themes: [
        {
            id: 1,
            name: 'theme'
        }
    ],
    isFetching: true
};

const ProfileBlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BLOG_THEME: {
            return {...state, themes: action.themes}
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




export const setThemes = (themes) => ({type: SET_BLOG_THEME, themes});
export const setUserBlogs = (blogs) => ({type: SET_USER_BLOGS, blogs});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const requestThemes = () =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getBlogThemes()
            dispatch(toggleIsFetching(false));
            dispatch(setThemes(data));
        }catch (e) {
            console.log(e.response);
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
export const addBlogFunc= (data)=>{
    return async () => {
        try {
            await addBlog(data)
            window.location.reload()
        }catch (e) {
            console.log(e.response);
        }
    }
}
export const updateBlogFunc= (data,id)=>{
    return async (dispatch) => {
        try {
            await updateBlog(data,id)
            let data2 = await getUserBlogs(localStorage.getItem('username'))
            dispatch(setUserBlogs(data2));


        }catch (e) {
            console.log(e.response);
        }
    }
}
export const delBlogFunc= (pk)=>{
    return async (dispatch) => {
        try {
            await deleteBlog(pk)
            let data = await getUserBlogs(localStorage.getItem('username'))
            dispatch(setUserBlogs(data));

        }catch (e) {
            console.log(e.response);
        }
    }
}

export default ProfileBlogReducer;
import {addTag, getBooksInfo} from "../../http/booksAPI";

const SET_BOOKS_INFO = 'SET_BOOKS_INFO'
const SET_NEW_TAG = 'SET_NEW_TAG'
const DEL_NEW_TAG = 'DEL_NEW_TAG'
const CLEAN_NEW_TAG = 'CLEAN_NEW_TAG'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {
    data: [],
    newTags: [],
    isFetching: true
};

const AddBookReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKS_INFO: {
            return {...state, data: action.info}
        }
        case DEL_NEW_TAG: {
            return {...state, newTags: state.newTags.filter(value => value.tag !== action.tag)}
        }
        case CLEAN_NEW_TAG: {
            return {...state, newTags: []}
        }
        case SET_NEW_TAG: {
            return {...state, newTags: [...state.newTags, action.tag]}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}



export const setBooksInfo = (info) => ({type: SET_BOOKS_INFO, info});
export const delNewTag = (tag) => ({type: DEL_NEW_TAG, tag});
export const cleanNewTag = () => ({type: CLEAN_NEW_TAG});
export const setNewTag = (tag) => ({type: SET_NEW_TAG, tag});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const requestBooksInfo = () =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getBooksInfo()
            dispatch(toggleIsFetching(false));
            dispatch(setBooksInfo(data));
        }catch (e) {
            console.log(e.response);
        }

    }
}
export const addTagFunc= (tag)=>{
    return async (dispatch) => {
        try {
            let data = await addTag(tag)
            dispatch(setNewTag(data.data));
            let data2 = await getBooksInfo();
            dispatch(setBooksInfo(data2));
        }catch (e) {
            console.log(e.response);
        }
    }
}

export default AddBookReducer;
import {addTag, editionBook, getBook, getBooksInfo} from "../../http/booksAPI";


const SET_BOOK = 'SET_BOOK';
const SET_BOOKS_INFO = 'SET_BOOKS_INFO'
const SET_MSG = 'SET_MSG'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const DEL_NEW_TAG = 'DEL_NEW_TAG'
const SET_NEW_TAG = 'SET_NEW_TAG'
const CLEAN_NEW_TAG = 'CLEAN_NEW_TAG'


let initialState = {
    data: [],
    bookInfo:[],
    newTags: [],
    msg: '',
    isFetching: true
};

const EditBookReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOK: {
            return {...state, data: action.book}
        }
        case SET_BOOKS_INFO: {
            return {...state, bookInfo: action.info}
        }
        case SET_MSG: {
            return {...state, bookInfo: action.msg}
        }
        case DEL_NEW_TAG: {
            return {...state, newTags: state.newTags.filter(value => value.tag !== action.tag)}
        }
        case SET_NEW_TAG: {
            return {...state, newTags: [...state.newTags, action.tag]}
        }
        case CLEAN_NEW_TAG: {
            return {...state, newTags: []}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}



export const setBook = (book) => ({type: SET_BOOK, book});
export const delNewTag = (tag) => ({type: DEL_NEW_TAG, tag});
export const setNewTag = (tag) => ({type: SET_NEW_TAG, tag});
export const cleanNewTag = () => ({type: CLEAN_NEW_TAG});
export const setBooksInfo = (info) => ({type: SET_BOOKS_INFO, info});
export const setMsg = (msg) => ({type: SET_BOOKS_INFO, msg});

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const requestBook = (id) =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getBook(id)
            dispatch(toggleIsFetching(false));
            dispatch(setBook(data));
        }catch (e) {
            console.log(e)
        }

    }
}

export const requestBooksInfo = () =>{
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await getBooksInfo()
        dispatch(toggleIsFetching(false));
        dispatch(setBooksInfo(data));
    }
}
export const saveEditionBook = (id,data) =>{
    return async (dispatch) => {

        let response = await editionBook(id,data)

        if (response.status === 200) {
            dispatch(cleanNewTag)
            setMsg('Изменения сохранены')
        }
    }
}
export const addTagFunc = (tag)=>{
    return async (dispatch) => {
        try {
            let data = await addTag(tag)
            dispatch(setNewTag(data.data));
            let data2 = await getBooksInfo();
            dispatch(setBooksInfo(data2));
        }catch (e) {
            console.log(e);
        }
    }
}

export default EditBookReducer
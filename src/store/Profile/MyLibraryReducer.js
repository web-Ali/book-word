import {getBookmarks, getPurchased} from "../../http/booksAPI";

const SET_BOOKMARK = 'SET_BOOKMARK';
const SET_PRUCHASED = 'SET_PRUCHASED';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const ERROR = 'ERROR';


let initialState = {
    data: [],
    dataPurchased: [],
    isFetching: true,
    error: ''
};

const MyLibraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKMARK: {
            return {...state, data: action.data}
        }
        case SET_PRUCHASED: {
            return {...state, dataPurchased: action.data}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case ERROR: {
            return {...state, error: action.error}
        }
        default:
            return state;
    }
}


export const setBookmarks = (data) => ({type: SET_BOOKMARK, data});
export const setPurchased = (data) => ({type: SET_PRUCHASED, data});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setError = (error) => ({type: ERROR, error});

export const requestBookmark = () =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            dispatch(setError(''));
            let data = await getBookmarks()
            dispatch(toggleIsFetching(false));
            dispatch(setBookmarks(data));
        }
        catch (e) {
            dispatch(setError(e.data));
            dispatch(toggleIsFetching(false));

        }

    }
}
export const requestPurchased = () =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            dispatch(setError(''));
            let data = await getPurchased()
            dispatch(toggleIsFetching(false));
            dispatch(setPurchased(data));
        }
        catch (e) {
            dispatch(setError(e.data));
            dispatch(toggleIsFetching(false));

        }

    }
}

export default MyLibraryReducer
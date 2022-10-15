import {bookVerify, deleteBook, getAllBooksUser} from "../../http/booksAPI";


const SET_BOOKS = 'SET_BOOKS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {
    data: [],
    isFetching: true
};

const BookListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKS: {
            return {...state, data: action.books}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}



export const setBooks = (books) => ({type: SET_BOOKS, books});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const requestBooks = (username) =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            dispatch(setBooks([]));
            let data = await getAllBooksUser(localStorage.getItem('username'))
            dispatch(toggleIsFetching(false));
            dispatch(setBooks(data));
        }catch (e) {
            console.log(e.response)
        }
        
    }
}
export const setListBookVerify = (username, id) =>{
    return async () => {
        try {
            await bookVerify(id)
        }
        catch (e) {

        }


    }
}
export const deleteThisBook = (id) =>{
    return async (dispatch) => {
        try {
            await deleteBook(id)
            dispatch(toggleIsFetching(true));
            dispatch(setBooks([]));
            let data = await getAllBooksUser(localStorage.getItem('username'))
            dispatch(toggleIsFetching(false));
            dispatch(setBooks(data));
        }
        catch (e) {
        }

    }
}
export default BookListReducer;
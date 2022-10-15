import {buyBook, getBook,} from "../../http/booksAPI";
import {deleteChapter, getChapter} from "../../http/chapterAPI";
import {message} from "antd";

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_CHAPTER = 'SET_CHAPTER';
const SET_BOOK_FOR_CHAPTER = 'SET_BOOK_FOR_CHAPTER';
const ERROR = 'ERROR';

let initialState = {
    data: [],
    bookData: {
        user: {},
        chapters: []
    },
    isFetching: false,
    error: ""
};

const ChapterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHAPTER: {
            return {
                ...state, data: action.data,
            }
        }
        case SET_BOOK_FOR_CHAPTER: {
            return {
                ...state, bookData: action.bookData,
            }
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


export const setData = (data) => ({type: SET_CHAPTER, data});
export const setBookData = (bookData) => ({type: SET_BOOK_FOR_CHAPTER, bookData});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setError = (error) => ({type: ERROR, error});

export const requestChapter = (bookId, chapterId) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            dispatch(setError(''))
            let bookData = await getBook(bookId)
            dispatch(setBookData(bookData));
            let data = await getChapter(bookId, chapterId)
            dispatch(setData(data.data));
            dispatch(toggleIsFetching(false));
        } catch (e) {
            if (e.response && e.response.status === 403) {
                dispatch(setError('You do not have access, you need to purchase the book'))
                dispatch(setData([]))
            } else {
                dispatch(setError('You do not have access, you need to purchase the book'))
                dispatch(setData([]))
            }
            dispatch(toggleIsFetching(false));
        }
    }

};
export const buyThisBook = (bookId, chapterId) => {
    return async (dispatch) => {
        try {
            let buy = await buyBook(bookId)
            if (buy.data.message === 'Book added') {
                message.success('The book has been purchased!')
                dispatch(setError(''))
            } else {
                message.error(<div className='p-3'>{buy.data.message}. Top up your balance in <a
                    target='_blank' href={window.location.origin + '/profile/info'}>your profile</a></div>)
            }
            let bookData = await getBook(bookId)
            dispatch(setBookData(bookData))
            let data = await getChapter(bookId, chapterId)
            dispatch(setData(data.data));
        } catch (e) {
            dispatch(setError('You do not have access, you need to purchase the book'))
        }

    }
}
export const deleteThisChapter = (bookId, chapterId) => {
    return async () => {
        try {
            await deleteChapter(bookId, chapterId)
            window.location = '/book/' + bookId
            // dispatch(saveLike(data));
        } catch (e) {
        }

    }
}


export default ChapterReducer
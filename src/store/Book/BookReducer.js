import {
    addBookmark, bookVerify,
    deleteBook,
    buyBook,
    getBook,
    likedBook,
    noLikedBook,
    removeBookmark,
    savePhoto
} from "../../http/booksAPI";
import {AddBookComments, deleteComment, getBookComments} from "../../http/commentAPI";
import {changeChapterPosition} from "../../http/chapterAPI";
import {message} from 'antd';


const SET_BOOK = 'SET_BOOK';
const SET_COMMENTS = 'SET_COMMENTS';
// const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
// const LIKED = 'LIKED';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const ERROR = 'ERROR';


let initialState = {
    data: {
        user: {
            id: '',
        },
        form: {},
        chapters: [],
        tags: [],
        cover: ''
    },
    comments: [],
    isFetching: true,
    error: ''
};

const PopularReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS: {
            return {...state, comments: action.comments}
        }
        case SET_BOOK: {
            return {...state, data: action.book}
        }
        // case SAVE_PHOTO_SUCCESS: {
        //     return {...state, data: {...state.data, cover: action.photo }}
        // }
        // case LIKED: {
        //     return {...state, data: {...state.data, is_liked: action.liked }}
        // }
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


export const setBook = (book) => ({type: SET_BOOK, book});
export const setComments = (comments) => ({type: SET_COMMENTS, comments});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
// export const savePhotoSuccess = (photo) => ({type: SAVE_PHOTO_SUCCESS, photo})
export const setError = (error) => ({type: ERROR, error});
// export const saveLike = (liked) => ({type: LIKED, liked})

export const changeThisChapterPosition = (BookId, ChapterId, position) => {
    return async (dispatch) => {
        try {
            await changeChapterPosition(BookId, ChapterId, position)
            let data = await getBook(BookId)
            dispatch(setBook(data));
        } catch (e) {
        }

    }
}

export const saveNewPhoto = (file, id) => {
    return async (dispatch) => {
        try {
            await savePhoto(file, id)

            let data = await getBook(id)
            dispatch(setBook(data))
            // console.log(data.cover)
            // dispatch(savePhotoSuccess(data.cover));
        } catch (e) {

        }

    }
}
export const setBookVerify = (bookId) => {
    return async (dispatch) => {
        try {
            await bookVerify(bookId)

            let data = await getBook(bookId)
            dispatch(setBook(data))
            // console.log(data.cover)
            // dispatch(savePhotoSuccess(data.cover));
        } catch (e) {

        }


    }
}
export const requestBook = (id) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            dispatch(setError(''));
            let data = await getBook(id)
            dispatch(toggleIsFetching(false));
            dispatch(setBook(data));

        } catch (e) {
            dispatch(setError('Book is missing'));
            dispatch(toggleIsFetching(false));

        }

    }
}
export const requestBookComments = (id) => {
    return async (dispatch) => {
        try {

            let data = await getBookComments(id)
            dispatch(setComments(data));
        } catch (e) {
            console.log(e.response)
        }

    }
}
export const setComment = (id, comment) => {
    return async (dispatch) => {
        try {

            await AddBookComments(id, comment)
            let data = await getBookComments(id)
            dispatch(setComments(data));
        } catch (e) {
            console.log(e.response)
        }

    }
}
export const deleteThisComment = (id, bookId) => {
    return async (dispatch) => {
        try {
            await deleteComment(id)
            let data = await getBookComments(bookId)
            dispatch(setComments(data));
        } catch (e) {
            console.log(e.response)
        }

    }
}

export const bookLikeOn = (id) => {
    return async (dispatch) => {
        try {
            await likedBook(id)
            // dispatch(saveLike(data));
            let data = await getBook(id)
            dispatch(setBook(data));
        } catch (e) {
        }

    }
}
export const deleteThisBook = (id) => {
    return async (dispatch) => {
        try {
            await deleteBook(id)
            window.location = '/profile/mybooks'
            // dispatch(saveLike(data));
        } catch (e) {
        }

    }
}

export const buyThisBook = (id) => {
    return async (dispatch) => {
        try {
            let buy = await buyBook(id)
            if (buy.data.message === 'Book added') {
                message.success('The book has been purchased!')
            } else {
                message.error(<div className='p-3'>У вас недостаточно денежных средств. Пополнить свой баланс в своем профиле <a
                    target='_blank' href={window.location.origin + '/profile/info'}>своем профиле</a></div>)
            }
            let data = await getBook(id)
            dispatch(setBook(data))
        } catch (e) {
        }

    }
}

export const bookLikeOff = (id) => {
    return async (dispatch) => {
        try {
            await noLikedBook(id)
            // dispatch(saveLike(data));
            let data = await getBook(id)
            dispatch(setBook(data));
        } catch (e) {
        }

    }
}
export const setBookMark = (id) => {
    return async (dispatch) => {
        try {
            await addBookmark(id)
            // dispatch(saveLike(data));
            let data = await getBook(id)
            dispatch(setBook(data));
        } catch (e) {
        }

    }
}
export const deleteBookmark = (id) => {
    return async (dispatch) => {
        try {
            await removeBookmark(id)
            // dispatch(saveLike(data));
            let data = await getBook(id)
            dispatch(setBook(data));
        } catch (e) {
        }

    }
}

export default PopularReducer

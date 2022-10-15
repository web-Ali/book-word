import {
    getAuthors,
    getBasicAdvertising,
    getAdvancedAdvertising,
    getBestsellersBooks,
    getContinueRead,
    getHotBooks,
    getMostReadedBooks,
    getPopularBooks
} from "../../http/booksAPI";

const SET_BASIC_ADVERTISING = 'SET_BASIC_ADVERTISING';
const SET_ADVANCED_ADVERTISING = 'SET_ADVANCED_ADVERTISING'
const SET_POPULAR = 'SET_POPULAR';
const SET_HOT = 'SET_HOT';
const SET_BESTSELLERS = 'SET_BESTSELLERS';
const SET_MOSTREADED = 'SET_MOSTREADED';
const SET_AUTHORS = 'SET_AUTHORS';
const SET_CONTINUE_READ = 'SET_CONTINUE_READ';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {
    basicAdvertising: [],
    hot: [],
    popular: [],
    bestsellers : [],
    mostreaded: [],
    authors: [],
    continueRead: {
        book: {}
    },
    isFetching: true
};

const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BASIC_ADVERTISING: {
            return {...state, basicAdvertising: action.basicAdvertising}
        }
        case SET_ADVANCED_ADVERTISING: {
            return {...state, advancedAdvertising: action.advancedAdvertising}
        }
        case SET_POPULAR: {
            return {...state, popular: action.popular}
        }
        case SET_HOT: {
            return {...state, hot: action.hot}
        }
        case SET_CONTINUE_READ: {
            return {...state, continueRead: action.continueRead}
        }
        case SET_MOSTREADED: {
            return {...state, mostreaded: action.mostreaded}
        }
        case SET_BESTSELLERS: {
            return {...state, bestsellers: action.bestsellers}
        }
        case SET_AUTHORS: {
            return {...state, authors: action.authors}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}


export const setBasicAdvertising = (basicAdvertising) => ({type: SET_BASIC_ADVERTISING, basicAdvertising});
export const setAdvancedAdvertising = (advancedAdvertising) => ({type: SET_ADVANCED_ADVERTISING, advancedAdvertising})
export const setPopular = (popular) => ({type: SET_POPULAR, popular});
export const setHot = (hot) => ({type: SET_HOT, hot});
export const setContinueRead = (continueRead) => ({type: SET_CONTINUE_READ, continueRead});
export const setBestsellers = (bestsellers) => ({type: SET_BESTSELLERS, bestsellers});
export const setMostReaded = (mostreaded) => ({type: SET_MOSTREADED, mostreaded});
export const setAuthors = (authors) => ({type: SET_AUTHORS, authors});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const requestAuthors = () => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await getAuthors()
        dispatch(toggleIsFetching(false));
        dispatch(setAuthors(data));
    }
}
export const requestPopular = () => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await getPopularBooks()
        dispatch(toggleIsFetching(false));
        dispatch(setPopular(data));
    }
}
export const requestContinueRead = () => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await getContinueRead()
        dispatch(toggleIsFetching(false));
        dispatch(setContinueRead(data));
    }
}
export const requestHot = () => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await getHotBooks()
        dispatch(toggleIsFetching(false));
        dispatch(setHot(data));
    }
}
export const requestBestsellers = () => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await getBestsellersBooks()
        dispatch(toggleIsFetching(false));
        dispatch(setBestsellers(data));
    }
}
export const requestMostReaded = () => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await getMostReadedBooks()
        dispatch(toggleIsFetching(false));
        dispatch(setMostReaded(data));
    }
}

export const requestBasicAdvertising = () => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getBasicAdvertising()
            dispatch(toggleIsFetching(false));
            dispatch(setBasicAdvertising(data));
        }catch (e) {
            console.log(e)
        }

    }
}

export const requestAdvancedAdvertising = () => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await getAdvancedAdvertising()
        dispatch(toggleIsFetching(false));
        dispatch(setAdvancedAdvertising(data));
    }
}

export default MainReducer
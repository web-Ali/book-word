import {editionChapter, getChapter} from "../../http/chapterAPI";

const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_CHAPTER = 'SET_CHAPTER';
const ERROR = 'ERROR';

let initialState = {
    data: "",
    isFetching: false,
    error:""
};

const EditChapterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHAPTER: {
            return {...state, data: action.data,
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
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setError = (error) => ({type: ERROR, error});

export const requestChapter = (bookId,chapterId) =>{
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getChapter(bookId,chapterId)
            dispatch(setData(data.data));
            dispatch(toggleIsFetching(false));
            dispatch(setError(''))

        }catch (e) {
            dispatch(setError('Возникла ошибка'))
            dispatch(toggleIsFetching(false));
        }
    }

};
export const saveEditionChapter = (bookid,chapterid,data) =>{
    return async () => {

        let response = await editionChapter(bookid,chapterid,data)
        console.log(response)
        if (response.status === 200) {
            setError('Изменения сохранены')
        }
    }
}

export default EditChapterReducer
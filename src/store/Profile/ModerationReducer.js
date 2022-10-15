
import {getChaptersModeration, verifyModeration} from "../../http/moderationAPI";



const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_CHAPTERS_MODERATION = 'SET_CHAPTERS_MODERATION';

const ERROR = 'ERROR';

let initialState = {
    data:[],
    isFetching: false,
    error: ""
};
const  ModerationReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_CHAPTERS_MODERATION: {
            return {...state, data: action.data}
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
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setChaptersMod = (data) => ({type: SET_CHAPTERS_MODERATION, data});
export const setError = (error) => ({type: ERROR, error});

export const requestChapterMod = () => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getChaptersModeration()
            dispatch(toggleIsFetching(false));
            dispatch(setError(''))
            dispatch(setChaptersMod(data.data));
        } catch (e) {

            for (let key in e.response.data) {
                dispatch(setError(e.response.data[key]))
            }
            dispatch(toggleIsFetching(false));
        }
    }

};

export const setModerationVerify = (chapterId, bool) => {
    return async (dispatch) => {
        try {
            await verifyModeration(chapterId, bool)
            dispatch(toggleIsFetching(true));
            let data = await getChaptersModeration()
            dispatch(toggleIsFetching(false));
            dispatch(setChaptersMod(data.data));
            dispatch(setError(''))
        } catch (e) {
            dispatch(toggleIsFetching(true));
            let data = await getChaptersModeration()
            dispatch(setChaptersMod(data.data));
            dispatch(setError(e.response))
            dispatch(toggleIsFetching(false));
        }
    }

};

export default ModerationReducer;
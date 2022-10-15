import {getStatistics} from "../../http/statisticsAPI";

const SET_STATS = 'SET_STATS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const ERROR = 'ERROR';


let initialState = {
    stats: {},
    isFetching: true
};

const StatisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATS: {
            return {...state, stats: action.stats}
        }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        default:
            return state;
    }
}


export const setStats = (stats) => ({type: SET_STATS, stats});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const requestStatistics = (start,end,book) =>{
    return async (dispatch) => {
        try {
            let data = await getStatistics(start,end,book)
            dispatch(setStats(data));
        }
        catch (e) {
            dispatch(toggleIsFetching(false));
            console.log(e)
        }

    }
}

export default StatisticsReducer
import {getAdvancedAdvertising} from "../../http/booksAPI";


const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const THREE_ADVERTISING_DATA = 'THREE_ADVERTISING_DATA';


let initialState = {
    threeAdvertisingData: [],
    isFetching: false
};

const AdvertisingReducer = (state = initialState, action) => {
    switch (action.type) {

        case THREE_ADVERTISING_DATA: {
            return {...state, threeAdvertisingData: action.threeAdvertisingData}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}


export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setThreeAdvertisingData = (threeAdvertisingData) => ({type: THREE_ADVERTISING_DATA, threeAdvertisingData});



export const threeAdvertising = () => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getAdvancedAdvertising()
            dispatch(setThreeAdvertisingData(data))
            dispatch(toggleIsFetching(false));
        } catch (e) {
            console.log(e.response)
        }
    }

};

export default AdvertisingReducer
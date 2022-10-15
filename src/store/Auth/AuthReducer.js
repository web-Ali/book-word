import { login, registration, verify} from "../../http/userAPI";
import jwt_decode from "jwt-decode";


const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const IS_REGISTERED = 'IS_REGISTERED';
const LOGIN = 'LOGIN';
const ERROR = 'ERROR';
const TOKEN_VALID = 'TOKEN_VALID';

let initialState = {
    isAuth: false,
    username: "",
    balance: 0,
    is_registered: false,
    isFetching: false,
    tokenValid: true,
    error: ""
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                token: action.data.access,
                username: action.data.username,
            }
        }
        case IS_REGISTERED: {
            return {...state, is_registered: action.is_registered}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case ERROR: {
            return {...state, error: action.error}
        }
        case TOKEN_VALID: {
            return {...state, tokenValid: action.tokenValid}
        }
        default:
            return state;
    }
}


export const setLoginData = (data) => ({type: LOGIN, data});
export const setIsRegistered = (is_registered) => ({type: IS_REGISTERED, is_registered});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setError = (error) => ({type: ERROR, error});
// export const setTokenValid = (tokenValid) => ({type: TOKEN_VALID, tokenValid});


export const postLogin = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await login(formData)
            dispatch(setLoginData(data.data));
            dispatch(toggleIsFetching(false));
            dispatch(setError(''))
            if (data.data?.username && data.data?.access) {
                // console.log(jwtDecode(data.data.access))
                // console.log(parseInt(Date.now() / 1000))
                localStorage.setItem("token", data.data.access)
                const jwt = jwt_decode(data.data.access);
                localStorage.setItem('id', jwt.user_id);

                // console.log(jwtDecode(data.data.refresh))
                // console.log(parseInt(Date.now() / 1000))
                // localStorage.setItem("token", data.data.refresh)

                localStorage.setItem("username", data.data.username)
                window.location.reload();
            }

        } catch (e) {
            if (e.response.status === 400) {
                dispatch(setError('Fill in the empty fields'))
            } else {
                dispatch(setError('Login or password is incorrect'))
            }
            dispatch(toggleIsFetching(false));
        }
    }

};
export const postRegistration = (formData) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await registration(formData)
            dispatch(toggleIsFetching(false));
            dispatch(setError(''))
            dispatch(setIsRegistered(true));
        } catch (e) {

            for (let key in e.response.data) {
                dispatch(setError(e.response.data[key]))
            }
            dispatch(toggleIsFetching(false));
        }
    }

};



export const verifyAccount = (code) => {
    return async () => {
        try {
            let res = await verify(code)
            return res.status
        } catch (e) {
            return e.response.status
        }
    }
}

export const clearError = () => {
    return async (dispatch) => {
        dispatch(setError(''))
    }

};

export default AuthReducer
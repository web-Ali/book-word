import {
    addProfileComment, deleteNotifications, deleteProfileComment,
    getMyProfile, getNotifications, getProfileComment,
    saveBackgroundPhoto,
    saveProfilePhoto,
    updateProfileQuery
} from "../../http/userAPI";


const SET_MY_PROFILE = 'SET_MY_PROFILE';
const SET_MY_COMMENTS = 'SET_MY_COMMENTS';
const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
const SET_NEW_NOTIFICATIONS = 'SET_NEW_NOTIFICATIONS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {
    data: {},
    comments: [],
    notifications: [],
    newNotifications: [],
    isFetching: true
};

const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_PROFILE: {
            return {...state, data: action.user}
        }
        case SET_MY_COMMENTS: {
            return {...state, comments: action.comments}
        }
        case SET_NOTIFICATIONS: {
            return {...state, notifications: action.notifications}
        }
        case SET_NEW_NOTIFICATIONS: {
            return {...state, newNotifications: action.newNotifications}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}


export const setUser = (user) => ({type: SET_MY_PROFILE, user: user});
export const setComments = (comments) => ({type: SET_MY_COMMENTS, comments});
export const setNotifications = (notifications) => ({type: SET_NOTIFICATIONS, notifications});
export const setNewNotifications = (newNotifications) => ({type: SET_NEW_NOTIFICATIONS, newNotifications});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const requestMyProfile = (username) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            let data = await getMyProfile(username)
            dispatch(toggleIsFetching(false));
            dispatch(setUser(data));
        }catch (e) {
            console.log(e)
        }

    }
}
export const requestNotifications = (type) => {
    return async (dispatch) => {
        try {
            if (type === 'view') {
                await getNotifications('view')
                dispatch(setNewNotifications([]));

            } else {
                let data = await getNotifications(type)
                dispatch(setNotifications(data));
            }
        }catch (e) {
            console.log(e)
        }

    }
}
export const deleteNotificationsThunkAction = (id) => {
    return async (dispatch) => {
        try {
            await deleteNotifications(id)
            let data = await getNotifications('all')
            dispatch(setNotifications(data));
        }catch (e) {
            console.log(e)
        }

    }
}
export const requestNewNotifications = () => {
    return async (dispatch) => {
        try {
            let data = await getNotifications('new')
            dispatch(setNewNotifications(data));
        }catch (e) {
            console.log(e)
        }

    }
}
export const saveNewProfilePhoto = (file, username) => {
    return async (dispatch) => {
        try {
            await saveProfilePhoto(file, username)

            let data = await getMyProfile(username)
            dispatch(setUser(data))
            // console.log(data.cover)
            // dispatch(savePhotoSuccess(data.cover));
        } catch (e) {

        }

    }
}
export const updateProfile = (profile, username) => {
    return async (dispatch) => {
        try {
            await updateProfileQuery(profile, username)
            let data = await getMyProfile(username)
            dispatch(setUser(data))
        } catch (e) {

        }
    }

}
export const saveNewBackgroundPhoto = (file, username) => {
    return async (dispatch) => {
        try {
            await saveBackgroundPhoto(file, username)

            let data = await getMyProfile(username)
            dispatch(setUser(data))
            // console.log(data.cover)
            // dispatch(savePhotoSuccess(data.cover));
        } catch (e) {

        }

    }
}

export const requestProfileComment = (username) => {
    return async (dispatch) => {
        try {
            let data = await getProfileComment(username)
            dispatch(setComments(data))
        } catch (e) {

        }
    }
}
export const deleteProfileCommentFunc = (id, username) => {
    return async (dispatch) => {
        try {
            await deleteProfileComment(id)
            let data = await getProfileComment(username)
            dispatch(setComments(data))
        } catch (e) {

        }
    }
}
export const addProfileCommentFunc = (username, formData) => {
    return async (dispatch) => {
        try {
            await addProfileComment(username, formData)
            let data = await getProfileComment(username)
            dispatch(setComments(data))
            // console.log(data.cover)
            // dispatch(savePhotoSuccess(data.cover));
        } catch (e) {

        }
    }
}
export default ProfileReducer;
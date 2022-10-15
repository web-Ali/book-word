import {$authHost, $host} from "./index";


export const registration =  (data) => {
    return $host.post('register/?lang='+localStorage.getItem('i18nextLng'), data)
        .then(response => {
            return response.data;
        });
}

export const login =  (formData) => {
    return  $host.post('token/?lang='+localStorage.getItem('i18nextLng'), formData)
        .then(response => {
            return response;
        });
}

export const verify =  (code) => {
    return  $host.get(`verify/`+code+'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}



export const saveProfilePhoto =(file,username) => {
    return $authHost.patch('users/'+username+'/update/?lang='+localStorage.getItem('i18nextLng'),file)
        .then(response => {
            return response;
        });
}
export const saveBackgroundPhoto =(file,username) => {
    return $authHost.patch('users/'+username+'/update/?lang='+localStorage.getItem('i18nextLng'),file)
        .then(response => {
            return response;
        });
}
export const updateProfileQuery =(data,username) => {
    return $authHost.patch('users/'+username+'/update/?lang='+localStorage.getItem('i18nextLng'),data)
        .then(response => {
            return response;
        });
}

export const getMyProfile =  (username) => {
    return $authHost.get('users/' + username + '/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const addProfileComment =  (username,formData) => {
    return $authHost.post('users/' + username + '/comments/?lang='+localStorage.getItem('i18nextLng'), formData)
        .then(response => {
            return response.data;
        });
}
export const getProfileComment =  (username) => {
    return $authHost.get('users/' + username + '/comments/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const deleteProfileComment =  (id) => {
    return $authHost.delete('users/comments/'+id+'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const subscribe =  (username) => {
    return $authHost.post('subscribe/' + username +'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}

export const getNotifications =  (type) => {
    return $authHost.get('notifications/' + type +'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const deleteNotifications =  (id) => {
    return $authHost.delete('notifications/' + id +'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
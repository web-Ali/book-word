import {$authHost} from "./index";


export const getBlog =(id) => {
    return $authHost.get('blog/'+id+'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getUserBlogs =(username) => {
    return $authHost.get('users/'+username+'/blog/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getBlogThemes =() => {
    return $authHost.get('blog-themes/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}

export const addBlog =(data) => {
    return $authHost.post('blog/?lang='+localStorage.getItem('i18nextLng'), data)
        .then(response => {
            return response;
        });
}
export const updateBlog =(data,id) => {
    return $authHost.patch('blog/'+id+'/?lang='+localStorage.getItem('i18nextLng'), data)
        .then(response => {
            return response;
        });
}
export const deleteBlog =(id) => {
    return $authHost.delete('blog/'+id+'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}

import {$authHost} from "./index";

export const AddBookComments =(id, comment) => {
    return $authHost.post('books/'+ id+'/comments/?lang='+localStorage.getItem('i18nextLng'), comment)
        .then(response => {
            return response;
        });
}

export const deleteComment =(id) => {
    return $authHost.delete('books/comments/'+id+'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}


export const getBookComments =  (id) => {
    return $authHost.get('books/' + id+'/comments/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const AddBlogComments =(id, comment) => {
    return $authHost.post('blog/'+ id+'/comments/?lang='+localStorage.getItem('i18nextLng'), comment)
        .then(response => {
            return response;
        });
}

export const deleteBlogComment =(id) => {
    return $authHost.delete('blog/comments/'+id+'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}


export const getBlogComments =  (id) => {
    return $authHost.get('blog/' + id+'/comments/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
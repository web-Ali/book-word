import {$authHost, $host} from "./index";



export const getBasicAdvertising = () => {
    return $authHost.get('basic-advertising/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getAdvancedAdvertising = () => {
    return $authHost.get('advanced-advertising/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getHotBooks =  () => {
    return $authHost.get('hot/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getPopularBooks =  () => {
    return $authHost.get('popular/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getBestsellersBooks =  () => {
    return $authHost.get('bestsellers/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getMostReadedBooks =  () => {
    return $authHost.get('most-readed/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getAuthors =  () => {
    return $authHost.get('author-of-day/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getContinueRead =  () => {
    return $authHost.get('last-read/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}


export const getBook =  (id) => {
    return $authHost.get('books/' + id+'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}

export const getBookmarks =  () => {
    return $authHost.get('bookmarks/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getPurchased =  () => {
    return $authHost.get('purchased/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}

export const getBooksInfo =  () => {
    return $host.get('books/info/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}
export const getAllBooksUser =  (username) => {
    return $authHost.get('users/'+ username+'/books/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response.data;
        });
}

export const addTag =(tag) => {
    return $authHost.post('tag/?lang='+localStorage.getItem('i18nextLng'),tag)
        .then(response => {
            return response;
        });
}
export const addBook =(book) => {
    return $authHost.post('books/?lang='+localStorage.getItem('i18nextLng'),book)
        .then(response => {
            return response;
        });
}

export const addBookmark =(id) => {
    return $authHost.post('/books/'+id+'/bookmark/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}
export const removeBookmark =(id) => {
    return $authHost.delete('/books/'+id+'/bookmark/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}

export const buyBook =(book) => {
    return $authHost.post('books/'+book+'/buy/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}

export const deleteBook =(book) => {
    return $authHost.delete('books/'+book+'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}

export const likedBook = (id) => {
    return $authHost.post('books/'+id+'/like/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}
export const noLikedBook = (id) => {
    return $authHost.delete('books/'+id+'/like/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}
export const savePhoto =(file,id) => {
    return $authHost.patch('books/'+id+'/?lang='+localStorage.getItem('i18nextLng'),file)
        .then(response => {
            return response;
        });
}
export const bookVerify =(id) => {
    return $authHost.get('books/'+id+'/verify/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}
export const editionBook =(id,data) => {
    return $authHost.patch('books/'+id+'/?lang='+localStorage.getItem('i18nextLng'),data)
        .then(response => {
            return response;
        });
}


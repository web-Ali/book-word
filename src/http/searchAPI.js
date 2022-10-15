import {$authHost} from "./index";

export const searchBooks =  (search) => {
    return $authHost.get('books/?'+ search)
        .then(response => {
            return response.data;
        });
}
// export const TempBooksAdvert =  () => {
//     return $authHost.get('books/?form&paid=&genre=&tags=&search&ordering&s=3')
//         .then(response => {
//             return response.data.results;
//         });
// }
export const searchBlogs =  (search) => {
    return $authHost.get('blog/?lang='+localStorage.getItem('i18nextLng')+'&'+ search)
        .then(response => {
            return response.data;
        });
}

export const searchUsers =  (search) => {
    return $authHost.get('users/?'+ search)
        .then(response => {
            return response.data;
        });
}

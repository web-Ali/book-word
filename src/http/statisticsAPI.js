import {$authHostStats} from "./index";

export const getStatistics =  (start, end, book = null) => {

    let bookData = '';
    if (book){
        bookData = `&book_id=${book}`
    }
    return $authHostStats.get(`books-stats/?start=${start}&end=${end}`+bookData)
        .then(response => {
            return response.data;
        });
}
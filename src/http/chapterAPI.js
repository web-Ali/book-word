import {$authHost} from "./index";

export const editionChapter =(bookId,chapterId,data) => {
    return $authHost.put('chapter/'+bookId+'/'+chapterId+'/?lang='+localStorage.getItem('i18nextLng'),data)
        .then(response => {
            return response;
        });
}

export const deleteChapter =(bookId, chapterId) => {
    return $authHost.delete('chapter/'+bookId+'/'+chapterId+'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}
export const addChapter =(book,bookid) => {

    return $authHost.post('chapter/'+bookid+'/?lang='+localStorage.getItem('i18nextLng'),book)
        .then(response => {
            return response;
        });
}
export const getChapter = (BookId,ChapterId) => {
    return $authHost.get('chapter/' + BookId +'/' + ChapterId+'/?lang='+localStorage.getItem('i18nextLng'))
        .then(response => {
            return response;
        });
}

export const changeChapterPosition = (BookId, ChapterId, position) => {

    let formData = new FormData()

    formData.append('position', position);

    return $authHost.post('chapter/' + BookId +'/' + ChapterId+'/position/?lang='+localStorage.getItem('i18nextLng'), formData)
        .then(response => {
            return response;
        });
}
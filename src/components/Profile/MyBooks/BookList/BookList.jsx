import React from 'react';
import BookListItem from "./BookListItem";
import {isEmptyObj} from "../../../../utils/customFunc";
import style from "./BookList.module.scss";
import {useTranslation} from "react-i18next";




const BookList = ({books,verify,requestBooks, deleteBook}) => {
    const { t } = useTranslation();

    return (
        <div className={style.bookListContainer +' container'}>
            {isEmptyObj(books)
                ?
                <div className='text-center'>
                    <p className='p1 p-2'>{t('No books written!')}</p>
                </div>
                :
                books.map((a)=>{
                    return <BookListItem deleteBook={deleteBook} requestBooks={requestBooks} key={a.id} book={a} verify={verify}/>
                })
            }

        </div>
    );
};

export default BookList;
import React from 'react';
import photo from "../../../../assets/images/unnamed.png";
import style from "./BookList.module.scss";
import {NavLink} from "react-router-dom";
import {BOOK_ROUTE} from "../../../../routing/consts";
import {httpOnHttps} from "../../../../utils/customFunc";
import ModalAccept from "../../../UI/Modal/ModalAccept";
import {useTranslation} from "react-i18next";
import ModalInfo from "../../../UI/Modal/ModalInfo";


const BookListItem = ({book,verify,requestBooks,deleteBook}) => {

    const verifyRequest = async (name, id)=> {
        await verify(name, id);
        requestBooks();
    }
    const { t } = useTranslation();

    return (
        <div className={style.bookList}>
            <div className="row">
                <div className="col-sm-3 col-12 text-center text-sm-start">
                    <div className="img">
                        <NavLink to={BOOK_ROUTE + '/' + book.id}><img className={style.img}
                                                                      src={book?.cover ? httpOnHttps(book.cover) : photo}
                                                                      alt=""/></NavLink>
                    </div>
                </div>
                <div className="col-sm-9 col-12 pt-4 ">
                    {
                        book.verified === false &&
                        <div className='fst-italic'>{t('Attention! The work is available only to you')}
                            {/*{book.chapters?.length === 0 ?*/}
                            {/*    <ModalAccept*/}
                            {/*        button={<button  className='p-1 ms-3 my-btn type-4'> <span>{t('Delete book')}</span> </button>}*/}
                            {/*        text= {t('Are you sure you want to delete the book?')}*/}
                            {/*        desc={t('After deletion, it will be impossible to return the book! The book will be permanently deleted!')}*/}
                            {/*        call={()=>deleteBook(book.id)}*/}
                            {/*    />*/}

                            {/*    :*/}
                            {/*    <ModalInfo button={<button  className='p-1 ms-3 my-btn type-4'> <span>{t('Delete book')}</span> </button>}*/}
                            {/*               text= {t('Book cannot be deleted')}*/}
                            {/*               desc={t('The book has chapters! Delete them first!')}*/}
                            {/*    />*/}
                            {/*}*/}
                            <ModalAccept
                                button={<button  className='p-1 ms-3 my-btn type-4' ><span>{t('Delete book')}</span></button>}
                                text= {t('Are you sure you want to delete the book?')}
                                desc={t('After deletion, it will be impossible to return the book! The book will be permanently deleted!')}
                                call={()=>deleteBook(book.id)}
                            />

                        <hr/>

                        </div>
                    }
                    {
                        book.on_verification === false &&
                        <div className='text-danger'><p>{t('The work must be sent for verification')}</p>
                            <div className='d-flex justify-content-between mt-5'>
                                <NavLink to={BOOK_ROUTE + '/' + book.id}> <button className='my-btn type-1-blue me-4'>
                                   <span> <i className="fas fa-edit"/> {t('Open')}</span></button></NavLink>
                                <button onClick={() => verifyRequest(localStorage.getItem('username'),book.id)} className='my-btn type-5 me-2'>
                                    <span><i className="fas fa-share" /> {t('Send for verification')}</span></button></div>

                            <hr/></div>
                    }
                    {
                        book.on_verification === true &&
                        <div className='text-success'>{t('The book is still to be checked by site moderation')} <hr/></div>
                    }

                    <NavLink to={BOOK_ROUTE + '/' + book.id}><h3>{book.name}</h3></NavLink>
                    <p >
                        <span style={{fontSize: 16}} className='fw-bold'>{book.age_limit ? book.age_limit + '+, ' : null}</span>

                        {book?.form?.form}/ {Array.isArray(book.genre) && book.genre.map((g, index) => {
                        if (index === 0) {
                            return g.genre
                        }
                        return ', ' + g.genre
                    })}
                    </p>
                    <div className={style.statistic + ' d-flex justify-content-start mt-2'}>
                        <div>
                            <i className="fa fa-eye" aria-hidden="true"/> {book.views}
                        </div>
                        <div>
                            <i className="far fa-heart"/> {book.likes}
                        </div>

                    </div>
                    <div className={style.bookText + ' mt-3'}>
                        {book.description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookListItem;
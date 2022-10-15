import React from 'react';
import photo from "../../../assets/images/unnamed.png";
import style from "../../Profile/MyBooks/BookList/BookList.module.scss";
import {NavLink} from "react-router-dom";
import {BOOK_ROUTE} from "../../../routing/consts";
import {httpOnHttps} from "../../../utils/customFunc";



const UserBooksItem = ({book}) => {
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
                <div className="col-sm-9 col-12 pt-4">

                    <NavLink to={BOOK_ROUTE + '/' + book.id}><h3>{book.name}</h3></NavLink>
                    <p>
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

export default UserBooksItem;
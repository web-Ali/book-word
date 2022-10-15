import React, {useState} from 'react';
import photo from "../../assets/images/unnamed.png";
import style from "./Book.module.scss"
import "./Book.scss"
import {Link, NavLink} from "react-router-dom";
import {
    ADD_CHAPTER_ROUTER,
    EDIT_BOOK_ROUTE, MAIN_ROUTE,
    READER_ROUTER, USER_ROUTE
} from "../../routing/consts";
import jwtDecode from "jwt-decode";
import ModalEditPhoto from "../UI/Modal/ModalEditPhoto";
import ModalPromotion from "../UI/Modal/ModalPromotion";
import BookComments from "./BookComments";
import {httpOnHttps} from "../../utils/customFunc";
import StatisticsContainer from "../../containers/Statistics/StatisticsContainer";
import {DatePicker} from 'antd';
import ModalAccept from "../UI/Modal/ModalAccept";
import ModalAuth from "../UI/Modal/ModalAuth";
import {useTranslation} from "react-i18next";
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";
import locale from 'antd/es/date-picker/locale/ru_RU';
import Helmet from "react-helmet";

const Book = (props) => {

        const [dateStart, setDateStart] = useState(new Date())
        const [dateEnd, setDateEnd] = useState(new Date())
        const {t} = useTranslation();

        const {RangePicker} = DatePicker;

        function onChange(date) {
            if (date) {
                setDateStart(date[0]._d)
                setDateEnd(date[1]._d)
            }
        }

        let chapterId = props.data.chapters.find((item) => item.paid === false)


        const liked = () => {
            props.liked(props.data.id)
        };
        const noLiked = () => {
            props.noLiked(props.data.id)
        };
        if (props.error) {
            return (
                <div className='text-center mt-5    '>
                    <h1>{props.error}</h1>
                </div>
            )
        }

        const deletedChapterCall = (chapterid) => {
            return () => props.deletedChapter(props.data.id, chapterid)
        }

        const buyThisBook = () => {
            props.buyThisBook(props.data.id)
        }

        return (
            <>
                <Helmet
                    meta={[
                        {
                            "property": "description",
                            "content": props.data.description
                        },
                        {
                            "property": "og:description",
                            "content": props.data.description
                        },
                        {
                            "property": "og:image",
                            "content": props.data && props.data.cover ? httpOnHttps(props.data.cover) : photo
                        },
                        {
                            "property": "og:title",
                            "content": props.data.name
                        },
                        {
                            "property": "og:type",
                            "content": 'book'
                        },
                        {
                            "property": "twitter:image:src",
                            "content": props.data && props.data.cover ? httpOnHttps(props.data.cover) : photo
                        },

                    ]}
                >

                    <title>{props.data.name}</title>

                </Helmet>
                <div className='position-relative mt-4 '>
                    <div className='mb-3'><span className={style.arrow}>{'<'}</span> <span className={style.back}><Link
                        to={MAIN_ROUTE}> back </Link></span></div>

                    <h1 className='h3'>{props.data.name}</h1>
                    <div className={style.authorName}>
                        {/*{t('Author')}:*/}

                        <p className='p4'><Link
                            to={USER_ROUTE + '/' + props.data.user.username}>{props.data.user.fullname}</Link></p>
                    </div>
                    {
                        props.data.verified === false &&
                        <>
                            <hr/>
                            <div className='fst-italic'>{t('Attention! The work is available only to you')}
                            </div>
                        </>
                    }
                    {
                        props.data.on_verification === false &&
                        <div className='text-danger'><p>{t('The work must be sent for verification')}.</p>
                            <div className='text-end mt-5'>
                                <button onClick={() => props.verify(props.data.id)}
                                        className='my-btn type-5 me-2'>
                                    <span><i className="fas fa-share"/> {t('Send for verification')}</span>
                                </button>
                            </div>

                            <hr/>
                        </div>
                    }
                    {
                        props.data.on_verification === true &&
                        <div className='text-success'>{t('The book is still to be checked by site moderation')}
                            <hr/>
                        </div>
                    }
                </div>
                <div className={style.mainInfo}>
                    <div>
                        <div className='row m-0 p-0'>
                            <div className="col-sm-5 col-12">
                                <div className='d-flex justify-content-sm-end justify-content-center'>
                                    <div className={style.bookImgWrapper}>

                                        <div className={style.contImg}>
                                            <img
                                                src={props.data && props.data.cover ? httpOnHttps(props.data.cover) : photo}
                                                alt={props.data.name}/>
                                            <div className={style.photoEdit}>

                                                {localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id ?
                                                    <ModalEditPhoto savePhoto={props.savePhoto} id={props.data.id}/>
                                                    : null
                                                }

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-7 col-12">
                                <div className={style.bookInfoWrapper}>
                                    <div className={style.likeCount}>
                                        <span>
                                            <i className="fas fa-heart" style={{color: 'red', cursor: 'default'}}/>
                                        </span> {props.data.likes}
                                        <span className='ms-4'><i className="fa fa-eye"
                                                                  aria-hidden="true"/> {props.data.views}</span>

                                    </div>

                                    <div className={style.bookInfoText}>
                                        {t('status')}:
                                    </div>
                                    <div className={style.isFinished}>

                                        {props.data.finished ?
                                            <span>{t('The work is finished')}</span> :
                                            <span> {t('The work is not finished')}</span>
                                        }
                                    </div>

                                    <div className={style.bookInfoText}>
                                        {t('form')}:
                                    </div>
                                    <div className={style.form}>
                                        {props.data?.form?.form}
                                    </div>

                                    <div className={style.bookInfoText}>
                                        {t('genre')}:
                                    </div>
                                    <div className={style.genre}>
                                        {Array.isArray(props.data.genre) && props.data.genre.map((g, index) => {
                                            return <span key={g.pk}>{(index === 0 ? '' : ', ') + g.genre}</span>


                                        })}
                                    </div>
                                    <div className={style.bookInfoText}>
                                        {t('tags')}:
                                    </div>
                                    <div className={style.tags}>
                                        {Array.isArray(props.data.tags) && props.data.tags.map((g) => {
                                            return <span key={g.id}>{g.tag} </span>
                                        })}
                                    </div>

                                    <div className={style.bookInfoText}>
                                        {t('age limit')}:
                                    </div>
                                    <div>
                                        {props.data.age_limit ? props.data.age_limit : null}
                                    </div>


                                    <div className={style.statistic + ' d-flex justify-content-start mt-2 mb-2'}>

                                        <div>
                                            {props.data.is_liked ?
                                                <div><span onClick={noLiked}><i className="fas fa-heart"
                                                                                style={{color: 'red'}}/></span>
                                                </div>
                                                :
                                                <div><span onClick={liked}><i
                                                    className="far fa-heart"/></span>
                                                </div>


                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <span>{t('cost')}: </span><span
                                            style={{fontSize: 24}}>{props.data.price}{t('$')} </span>
                                        </div>

                                        {
                                            localStorage.getItem('token') &&
                                            jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id &&
                                            props.data.on_verification !== true
                                                ?
                                                <div>

                                                    <div className=' mt-3 mb-3'>
                                                        <NavLink to={EDIT_BOOK_ROUTE + '/' + props.data.id}>
                                                            <button className='my-btn type-1-blue w-100  '>
                                                    <span style={{fontSize: 14}}><i
                                                        className="fas fa-edit"/>{t('edit')}</span>
                                                            </button>
                                                        </NavLink>
                                                    </div>
                                                    <ModalPromotion bookId={props.data.id}/>
                                                </div>

                                                : props.data.price ? <div>

                                                    <div className=' mt-3 mb-3'>
                                                        {localStorage.getItem('username')
                                                            ?
                                                            !props.data.purchased
                                                                ?
                                                                <ModalAccept
                                                                    button={<button className='my-btn type-1-blue w-100  '>
                                                                        <span style={{fontSize: 14}}>{t('buy')} </span>
                                                                    </button>}
                                                                    call={() => buyThisBook()}
                                                                    text={t('Are you sure?')}
                                                                    desc={<span>{t('The price of this book is')} <span
                                                                        style={{fontSize: 17}}
                                                                        className='fw-bold text-primary'>{props.data.price}{t('$')}</span></span>}
                                                                />

                                                                : <button className='my-btn type-1-blue w-100  '>
                                                                    <span>{t('purchased')} <i
                                                                        className="fas fa-clipboard-check"/></span>
                                                                </button>
                                                            :
                                                            <ModalAuth button={<button className='my-btn type-1-blue w-100  '>
                                                                <span style={{fontSize: 14}}>{t('buy')}</span>
                                                            </button>}/>
                                                        }


                                                    </div>
                                                </div> : null

                                        }
                                        <div>
                                            {
                                                chapterId ? <div className=' mt-3 mb-3'>

                                                        <NavLink
                                                            to={READER_ROUTER + '/' + props.data.id + '/' + chapterId.pk}>
                                                            <button className='my-btn type-5 w-100  '>
                                                        <span>
                                                        <i className="fas fa-book"/> {t('start_read')}</span>
                                                            </button>
                                                        </NavLink>
                                                    </div>
                                                    :
                                                    null
                                            }

                                        </div>
                                        {props.data.is_bookmarked ?
                                            <div className=' mt-3 mb-3'>

                                                <button onClick={() => {
                                                    props.deleteBookmark(props.data.id)
                                                }} className='my-btn type-1 w-100  '>
                                                    <span style={{fontSize: 14}}>{t('added')} <i
                                                        className="fas fa-star"/></span>
                                                </button>

                                            </div>
                                            :
                                            <div className=' mt-3 mb-3'>
                                                {localStorage.getItem('token') &&
                                                <button onClick={() => {
                                                    props.bookmark(props.data.id)
                                                }} className='my-btn type-1 w-100  '>
                                                    <span style={{fontSize: 14}}><i
                                                        className="fas fa-plus"/> {t('to_bookmarks')}</span>
                                                </button>
                                                }


                                            </div>

                                        }
                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>
                    <div className='p-sm-5 pt-0 pt-sm-0'>

                        <h5>{t('Annotation')}</h5>
                        <div>
                            {props.data.description}
                        </div>
                    </div>
                </div>
                <div className={style.bookContent + ' mt-5'}>
                    <div className="row">
                        <div className="col-xl-9 col-12">
                            <h5 className='ms-5 mb-4'>{t('Contents')}</h5>
                            <div>
                                {props.data.chapters ? props.data.chapters.map(a => <div key={a.pk}>
                                        {
                                            (
                                                !props.data.paid ||
                                                !a.paid || props.data.purchased ||
                                                (localStorage.getItem('token') &&
                                                    jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id) ||
                                                false
                                            )
                                                ?
                                                (

                                                    <p className={style.chapterTitle + ' mb-2 '}>

                                                        <NavLink
                                                            to={READER_ROUTER + '/' + props.data.id + '/' + a.pk}>{a.name}
                                                        </NavLink>
                                                        <span style={{
                                                            fontSize: 14,
                                                            color: '#352983',
                                                            display: 'inline-block',
                                                            marginLeft: 12
                                                        }}>— {a.created.substr(0, 10)} {localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id ?
                                                            <>

                                                            <span onClick={() => props.changeChapter(
                                                                props.data.id,
                                                                a.pk,
                                                                +a.numeration - 1
                                                            )}
                                                                  style={{cursor: 'pointer', color: '#4582af'}}
                                                                  className=" ms-2 mt-2  "><i
                                                                className="fas fa-arrow-up"/> </span>
                                                                <span onClick={() => props.changeChapter(
                                                                    props.data.id,
                                                                    a.pk,
                                                                    +a.numeration + 1
                                                                )}
                                                                      style={{cursor: 'pointer', color: '#4582af'}}
                                                                      className=" ms-2 mt-2  "><i
                                                                    className="fas fa-arrow-down"/> </span>
                                                                <ModalAccept
                                                                    button={<span style={{
                                                                        cursor: 'pointer',
                                                                        fontSize: '18px',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                                  className=" ms-2 mt-2  text-danger">x </span>}
                                                                    text={t('Are you sure you want to delete the chapter?')}
                                                                    desc={t('The chapter will be permanently deleted!')}
                                                                    call={deletedChapterCall(a.pk)}
                                                                />
                                                            </>
                                                            : null
                                                        }</span>

                                                    </p>
                                                )
                                                : (<>
                                                        <p className={style.chapterTitle + ' mb-2 text-secondary'}>
                                                            <span>{a.name} <i className="fa fa-lock"
                                                                              aria-hidden="true"/></span>
                                                            <span style={{
                                                                fontSize: 14,
                                                                color: 'gray',
                                                                display: 'inline-block',
                                                                marginLeft: 12
                                                            }}>— {a.created.substr(0, 10)}</span>
                                                        </p>

                                                    </>

                                                )
                                        }


                                    </div>)


                                    : null}
                                {localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id ?
                                    <div className='text-center'>
                                        <NavLink to={ADD_CHAPTER_ROUTER + '/' + props.data.id}>
                                            <button
                                                className='my-btn type-5 mb-2'><span>{t('Add chapter')}</span></button>
                                        </NavLink></div>
                                    : null
                                }

                            </div>
                            <div>
                                {
                                    localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).user_id === props.data.user?.id ?
                                        <><h5 className='ms-5 mt-4 mb-4'>{t('Statistics')}</h5>
                                            <div className='text-sm-center text-start'>


                                                <RangePicker
                                                    locale={localStorage.getItem('i18nextLng') === 'ru' ? locale : null}
                                                    onChange={onChange}
                                                />

                                                {
                                                    props.data.id ?
                                                        <StatisticsContainer
                                                            start={dateStart.getFullYear() + '.' + (dateStart.getMonth() + 1) + '.' + dateStart.getDate()}
                                                            end={dateEnd.getFullYear() + '.' + (dateEnd.getMonth() + 1) + '.' + dateEnd.getDate()}
                                                            book={props.data.id}/>
                                                        : null
                                                }
                                            </div>
                                        </>

                                        : null
                                }
                            </div>
                        </div>
                        <div className="col-xl-3 col-12 mt-xl-0 mt-5">
                            <div className={style.advertBlock}>
                                <AdvertisingContainer/>
                            </div>

                        </div>
                    </div>

                </div>

                <div className={style.wrapper}>
                    <BookComments deleteThisComment={props.deleteThisComment} comments={props.comments}
                                  bookId={props.data.id} addComment={props.addComment}/>
                </div>
            </>


        );
    }
;

export default Book;

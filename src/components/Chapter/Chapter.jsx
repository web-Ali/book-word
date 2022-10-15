import React, {useEffect, useRef} from 'react';
import './style.css';
import photo from "../../assets/images/unnamed.png";
import Loader from "../Loader/Loader";
import {Link, NavLink} from "react-router-dom";
import {BOOK_ROUTE, EDIT_CHAPTER_ROUTER, READER_ROUTER} from "../../routing/consts";
import jwtDecode from "jwt-decode";
import style from './Chapter.module.scss'
import ModalAuth from "../UI/Modal/ModalAuth";
import ModalAccept from "../UI/Modal/ModalAccept";
import {useTranslation} from "react-i18next";
import {httpOnHttps} from "../../utils/customFunc";
import Helmet from "react-helmet";

const Chapter = ({data, error, isFetching, bookId, chapterid, bookData, buyThisBook}) => {

    const [scroll, setScroll] = React.useState(0);
    const [oldScroll, setOldScroll] = React.useState(0);
    const [showHead, setShowHead] = React.useState('');
    const [day, setDay] = React.useState(true);
    const [showSidebar, setShowSidebar] = React.useState(() => style.out);
    const [fontSize, setFontSize] = React.useState(localStorage.getItem('size'))

    const sizeChange = (num) => {
        localStorage.setItem('size', num)
        setFontSize(localStorage.getItem('size'))
    }
    const { t } = useTranslation();


    useEffect(() => {

        if (data.markdown && error === '') {

            let socket = new WebSocket(`wss://analytics.worldofwriter.com/ws/${bookId}/${chapterid}/?token=${localStorage.getItem('token')}`);
            let timerId = setTimeout(() => socket.close(1000, 'text'), 300000)
            return () => {
                clearTimeout(timerId);
                socket.close(1000, 'text')
            }
        }

    }, [data])


    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    useEffect(() => {
        if (oldScroll < scroll && scroll !== 0 ) {
            setShowHead(() => style.out)
        } else {
            setShowHead('')
        }

        setOldScroll(scroll);
    }, [scroll]);

    let chapterPk = bookData.chapters.findIndex(el => el.pk == chapterid);
    let next, prev;
    if (chapterPk === 0) {
        prev = null;
        next = bookData.chapters.find((el, index) => index === 1);
    } else if (bookData.chapters.length - 1 === chapterPk) {
        prev = bookData.chapters.find((el, index) => index === chapterPk - 1);
        next = null;
    } else {
        prev = bookData.chapters.find((el, index) => index === chapterPk - 1);
        next = bookData.chapters.find((el, index) => index === +chapterPk + 1);
    }

    const rootEl = useRef(null);
    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);
    return (
        <div className={style.chapterCont + ' ' + (day ?  '' : style.day )}>
            <Helmet>
                <title>{data.name + ' - ' + bookData.name}</title>
            </Helmet>
            <div className={showSidebar + ' ' + style.sidebare}>
                <div className={style.sidebarContent}>
                    <div className={style.sidebarTitle}>
                        <h1 className='h3 mt-2'>{bookData.name}</h1>
                        <div className={style.chapterimg}>
                            <img src={bookData.cover ? httpOnHttps(bookData.cover) : photo} alt={bookData.name}/></div>
                        <p>{t('Content')}: </p>
                        <button onClick={() => {
                            setShowSidebar(() => style.out);
                            window.scrollTo(0, 0);
                        }} className={' my-btn type-5 '}>
                            <span><i className="fas fa-times"/></span>
                        </button>
                    </div>
                    <div className={style.chapters}>
                        {bookData.chapters.map(a => {
                            if (chapterid == a.pk) {
                                return <div className={style.active} key={a.pk}>
                                    <i className="fas fa-caret-right"/> {a.name}</div>
                            }
                            return <NavLink key={a.pk} to={READER_ROUTER + '/' + bookId + '/' + a.pk}>
                                <div
                                    onClick={() => {
                                        setShowSidebar(() => style.out)
                                        window.scroll(0, 0)
                                    }}
                                    key={a.pk}>{a.name}
                                </div>
                            </NavLink>
                        })}


                    </div>
                </div>
            </div>
            <div className={style.nav + ' pt-3 ps-3 pb-3 ' + showHead}>
                <div className={style.navBtn}>
                    <button onClick={() => setShowSidebar('')} className={' my-btn type-1-blue btn me-3'}>
                        <span><i className="fa fa-list-ul" aria-hidden="true"/> <span>{t('Content')}</span></span>
                    </button>


                    <NavLink to={BOOK_ROUTE + '/' + bookId}>
                        <button className='my-btn type-1-blue me-3 mt-sm-0 mt-1 btn  '>
                            <span><i className="fa fa-book" aria-hidden="true"/> {t('Back to book')}</span>
                        </button>
                    </NavLink>
                    {localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).user_id === bookData?.user.id ?

                        <NavLink to={EDIT_CHAPTER_ROUTER + '/' + bookId + '/' + chapterid}>
                            <button className=' my-btn type-1-blue  me-3 mt-sm-0 mt-1 btn'>
                                <span><i className="fas fa-edit"/> {t('Edit chapter')}</span>
                            </button>
                        </NavLink>
                        :
                        null}
                </div>
                <div className={style.filter}>
                    <div>
                        <div className="dropdown">
                            <span style={{cursor: 'pointer'}} id="dropdownMenuButton1"
                                  data-bs-toggle="dropdown" aria-expanded="false">
                                {t('font size')} <span className={style.galochka}>{'>'} </span>
                            </span>
                            <ul className="dropdown-menu p-0 "
                                style={{marginLeft: -40, background: '#FCE7D5', border: 0}}
                                aria-labelledby="dropdownMenuButton1">
                                <div className={style.sizeItems}>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(10)}>10</span>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(12)}>12</span>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(14)}>14</span>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(16)}>16</span>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(18)}>18</span>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(20)}>20</span>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(22)}>22</span>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(24)}>24</span>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(26)}>26</span>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(28)}>28</span>
                                    <span style={{cursor: 'pointer'}} onClick={() => sizeChange(30)}>30</span>
                                </div>
                            </ul>
                        </div>

                    </div>
                    <div>
                        {
                            day ? <i onClick={() => setDay(false)} style={{cursor: 'pointer'}} className="fas fa-sun" /> :
                                <i onClick={() => setDay(true)} style={{cursor: 'pointer'}} className="fa-solid fa-moon" />
                        }


                    </div>
                </div>
            </div>

            <div>
                <div className={"ck-content container "}>
                    <h2 className='text-center fst-italic mb-5 mt-md-0 mt-5 pt-5'>{data.name}</h2>


                    {isFetching ? <div className='text-center'><Loader fix={false}/></div> : null}
                    {error && <div className='text-center'>{error} <br/><br/>{localStorage.getItem('username')
                        ?
                        <ModalAccept
                            button={<button className='my-btn type-1-blue w-100  '>
                                <span>{t('Buy')} | {bookData.price}{t('$')}</span>
                            </button>}
                            call={() => buyThisBook(bookId, chapterid)}
                            text={t('Are you sure?')}
                            desc={<span>{t('The price of this book is')} <span style={{fontSize: 17}}
                                                                        className='fw-bold text-primary'>{bookData.price}{t('$')}</span></span>}
                        />
                        :
                        <ModalAuth button={<button className='my-btn type-1-blue w-100'>
                            <span>{t('Buy')} | {bookData.price}{t('$')}</span>
                        </button>}/>
                    } </div>
                    }
                    <div className={style.readerContent + ' ' + style['fz' + fontSize]}>
                        <div dangerouslySetInnerHTML={{__html: data.markdown}}/>
                    </div>


                </div>
            </div>

            <div style={{marginTop: '-35px'}}>
                <div className='position-relative container pt-5' style={{paddingBottom: 40}}>
                    <div className={style.move}>
                        <Link onClick={e => prev ? window.scroll(0, 0) : e.preventDefault()}
                              to={READER_ROUTER + '/' + bookId + '/' + prev?.pk}>
                            <button className={style.rightMove + ' btn'}>
                                <i className={prev ? 'fas fa-arrow-left ' : 'fas fa-arrow-left d-none'}/>
                            </button>
                        </Link>


                        <Link onClick={e => next ? window.scroll(0, 0) : e.preventDefault()}
                              to={READER_ROUTER + '/' + bookId + '/' + next?.pk}>
                            <button className={style.leftMove + ' btn'}><i
                                className={next ? 'fas fa-arrow-right ' : 'fas fa-arrow-right d-none'}/></button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chapter;
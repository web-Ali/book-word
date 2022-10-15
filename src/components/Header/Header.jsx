import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import style from './Header.module.scss';
import logo from '../../assets/images/logo.png';
import {Link, NavLink} from "react-router-dom";
import {
    ADD_BOOKS_ROUTER, MY_BLOG_ROUTER,
    MY_BOOKS_ROUTER,
    MY_LIBRARY_ROUTER,
    MY_PROFILE_EXIT_ROUTER,
    MY_PROFILE_INFO, SEARCH_BLOG_ROUTER, SEARCH_BOOK_ROUTER, SEARCH_USER_ROUTER, STATS_ALL_ROUTER
} from "../../routing/consts";
import profilePhoto from '../../assets/images/profile.jpg'
import {httpOnHttps} from "../../utils/customFunc";
import NotificationsContainer from "../../containers/Header/NotificationsContainer";
import ModalAuth from "../UI/Modal/ModalAuth";
import {useTranslation} from "react-i18next";
import Hamburger from 'hamburger-react'



const Header = ({data, newNotifications}) => {

    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchRow, setSearchRow] = useState('');
    const [isOpen, setOpen] = useState(false)
    let history = useHistory();
    const { t } = useTranslation();

    function handleSubmit(e) {
        e.preventDefault();
        history.push(SEARCH_BOOK_ROUTER + '/0/0/' + searchRow + '/0/0');
    }

    function IsAuth() {


        if (localStorage.getItem('username') === data.username) {
            return <>

                <i className={style.auth + " fas fa-bell"}  style={newNotifications.length > 0 ? {cursor: 'pointer', color: '#FF1F62'} : {cursor: 'pointer'}}
                       onClick={() => setShowNotifications(true)}
                       />
                    {showNotifications ? <NotificationsContainer offModal={setShowNotifications}/>
                        : null
                    }


                <div className={style.auth + ' ' + style.avatar} >
                    <img onClick={()=>setOpen(false)} src={data.image ? 'https://worldofwriter.com' + httpOnHttps(data.image) : profilePhoto}
                         alt=""/>
                    <div className={style.avatarNav}>
                        <Link to={MY_PROFILE_INFO}>
                            <div style={{borderBottom: '1px solid #e6f0fc'}}><i className="fas fa-user"/> {t('my_profile')}
                            </div>
                        </Link>
                        <Link to={MY_BLOG_ROUTER}>
                            <div><i className="fas fa-feather-alt"/> {t('my_blog')}</div>
                        </Link>
                        <Link to={MY_BOOKS_ROUTER}>
                            <div><i className="fas fa-book"/> {t('my_books')}</div>
                        </Link>
                        {/*<Link to={ADD_BOOKS_ROUTER}>*/}
                        {/*    <div><i className="fas fa-plus"/> Add book</div>*/}
                        {/*</Link>*/}
                        <Link to={MY_LIBRARY_ROUTER}>
                            <div><i className="fas fa-book-reader"/> {t('my_library')}</div>
                        </Link>
                        <Link to={STATS_ALL_ROUTER}>
                            <div><i className="fas fa-chart-line"/> {t('statistics')} </div>
                        </Link>
                        <Link to={MY_PROFILE_EXIT_ROUTER}>
                            <div className='text-danger' style={{borderTop: '3px solid #e6f0fc'}}><i
                                className="fas fa-sign-out-alt"/> {t('exit')}
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        } else {
            return <div className={style.auth}><ModalAuth button={t('sign-in')}/></div>
        }
    }

    return (

        <div className="container">
            <div className={style.header}>
                    <div className={style.logo}>
                        <NavLink to={'/'}><img src={logo} alt=""/></NavLink>
                    </div>
                    <nav className={style.nav + ' ' + (!isOpen ?  style.close : '')}>
                        <ul >
                            <li onClick={()=>setOpen(false)}><NavLink  activeClassName={style.active} to={SEARCH_BOOK_ROUTER}><p className='p3 light'>{t('books')}</p></NavLink>

                            </li>
                            <li onClick={()=>setOpen(false)}><NavLink  activeClassName={style.active} to={SEARCH_USER_ROUTER}><p className='p3 light'>{t('authors')}</p></NavLink>

                            </li>
                            <li onClick={()=>setOpen(false)}><NavLink  activeClassName={style.active} to={SEARCH_BLOG_ROUTER}><p className='p3 light'>{t('community')}</p></NavLink>

                            </li>

                        </ul>
                    </nav>
                    <div className={style.navRight}>
                        {/*<div className={style.auth + ' ' + (localStorage.getItem('i18nextLng') === 'ru' ? style.activeLang : null)} style={{cursor: 'pointer'}} onClick={() => {*/}
                        {/*    i18next.changeLanguage('ru')*/}
                        {/*    window.location.reload()*/}
                        {/*}}  >*/}
                        {/*    ru*/}
                        {/*</div>*/}
                        {/*<div className={style.auth + ' ' + (localStorage.getItem('i18nextLng') === 'en' ? style.activeLang : null)} style={{cursor: 'pointer'}}*/}
                        {/*     onClick={() => {*/}
                        {/*    i18next.changeLanguage('en')*/}
                        {/*    window.location.reload()*/}
                        {/*}}*/}
                        {/*>*/}
                        {/*    en*/}
                        {/*</div>*/}
                        <div className={style.auth}>
                            {
                                (localStorage.getItem('username') === data.username) ?
                                    <Link to={ADD_BOOKS_ROUTER}>
                                    <span className={style.addBook}>
                                           <i className="fas fa-plus"/>{t('add_book')}
                                    </span>
                                    </Link> : null
                            }

                            <div className={style.searchRow + ' ' + (showSearch ? '' : style.hide)}>
                                <form onSubmit={handleSubmit}>
                                    <i className="fas fa-search"/>
                                    <input value={searchRow} onChange={(e) => setSearchRow(e.target.value)}
                                           type="text"/>
                                    <span style={{cursor: 'pointer'}} onClick={() => {
                                        setShowSearch(!showSearch);
                                        setSearchRow('')
                                    }}>
                                                    <i className="fas fa-times"/>
                                                </span>
                                </form>
                            </div>
                            <span className='d-inline-block' onClick={() => {
                                setShowSearch(!showSearch);
                                setSearchRow('')
                            }} style={{cursor: 'pointer'}}>
                                        <i className="fas fa-search"/>
                                        </span>
                        </div>

                        <IsAuth/>
                        <div className={style.auth + ' ' + style.hamburger}><Hamburger toggled={isOpen} toggle={setOpen} /></div>

                    </div>
            </div>
        </div>
    );
};

export default Header;
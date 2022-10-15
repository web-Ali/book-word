import React, {useState} from 'react';
import style from '../Profile/Profile.module.scss';
import bg from "../../assets/images/default-bg.jpg";
import photo from "../../assets/images/profile.jpg";
import UserBooks from "./UserBooks/UserBooks";
import UserInfo from "./UserInfo/UserInfo";
import ProfileComments from "../Profile/ProileComments";
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";
import AuthorContainer from "../../containers/Main/AuthorContainer";
import UserBlog from "./UserBlog/UserBlog";
import {httpOnHttps} from "../../utils/customFunc";
import likeImg from "../../assets/images/icons/like.svg";
import usersImg from "../../assets/images/icons/users.svg";
import listImg from "../../assets/images/icons/list.svg";
import {useTranslation} from "react-i18next";
import Helmet from "react-helmet";


const User = (props) => {
    const [tabs, setTabs] = useState('profile');
    const { t } = useTranslation();

    return (

        <>
            <Helmet>
                <title>{'Пользователь ' +props.data.fullname}</title>
            </Helmet>
            <div
                style={{backgroundImage: `url(${props.data.cover ? 'https://worldofwriter.com' + httpOnHttps(props.data.cover) : bg})`}}
                className={style.coverBg}>

            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-12 order-xl-first order-last">
                        <div >
                            <div>
                                <AdvertisingContainer/>
                            </div>
                        </div>
                        <div>
                            <AuthorContainer/>
                        </div>
                    </div>
                    <div className="col-xl-9 col-12">
                        <div className="row pb-5">
                            <div className="col-md-3 col-4">
                                <div className={style.profImg}>
                                    <img
                                        src={props.data.image ? 'https://worldofwriter.com' + httpOnHttps(props.data.image) : photo}
                                        alt=""/>
                                </div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <p className="p5">{t('last online')}:</p>
                                    <p className="p5 text-end">
                                        {props.data.online ? <span
                                            className='text-success'>Online now</span> : (props.data.last_seen ? props.data.last_seen.slice(0, 10) : null)}
                                    </p>
                                </div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <p className="p3 medium">{t('rating')}:</p>
                                    <p className="p3 medium text-end">{props.data.rating}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-8">
                                <div className={style.userStats}>
                                    <h5>{props.data.fullname}</h5>
                                    <div><img src={likeImg} alt="likes"/> {t('likes')} <b>{props.data.likes}</b></div>
                                    <div><img style={{width: 23}} src={usersImg}
                                              alt='subscribers'/> subscribers <b>{props.data.subscribers}</b></div>
                                    <div><img src={listImg} alt="lists"/> lists <b>{props.data.author_lists}</b></div>
                                </div>
                            </div>
                            <div className="col-md-3 col-12 pt-5">
                                {localStorage.getItem('username') ? <button onClick={() => props.subscribe(props.data.username)} className='my-btn type-1-blue '>
                                    {props.data.is_sub ? <span>&#10003; {t('You are subscribed')}</span> :
                                        <span>&#43; {t('Subscribe')}</span>}
                                </button> : null}

                            </div>
                        </div>
                        <div className="row">
                            <div className={style.nav}>
                                <ul className={style.tabs}>
                                    <li>
                                        <a className={tabs === 'profile' ? style.active : null}
                                           onClick={() => setTabs('profile')}>{t('Profile')}</a>
                                    </li>
                                    <li>
                                        <a className={tabs === 'books' ? style.active : null}
                                           onClick={() => setTabs('books')}>{t('Books')}</a>
                                    </li>
                                    <li>
                                        <a className={tabs === 'blog' ? style.active : null}
                                           onClick={() => setTabs('blog')}>{t('Blog')}</a>
                                    </li>
                                </ul>
                            </div>
                            <div className={style.pageContent}>
                                <div>
                                    {
                                        tabs === 'books' ? <UserBooks books={props.books}/>
                                            :
                                            tabs === 'profile' ? <UserInfo user={props.data}/>
                                                :
                                                tabs === 'blog' ? <UserBlog blogs={props.blogs}/>
                                                    : null
                                    }

                                </div>
                            </div>
                            <div className={style.comments}>

                                <ProfileComments
                                    deleteThisComment={props.deleteComment}
                                    comments={props.comments}
                                    username={props.data.username}
                                    addComment={props.addComment}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default User;
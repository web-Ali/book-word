import React from 'react';
import {NavLink, Route, Switch,} from 'react-router-dom';
import bg from "../../assets/images/default-bg.jpg";
import style from "./Profile.module.scss";
import photo from "../../assets/images/profile.jpg";
import MyLibraryContainer from "../../containers/Profile/MyLibraryContainer";
import ModerationContainer from "../../containers/Profile/ModerationContainer";
import ModalEditProfilePhoto from "../UI/Modal/ModalEditProfilePhoto";
import {
    ADD_BOOKS_ROUTER,
    MODERATION_ROUTER,
    MY_BLOG_ROUTER,
    MY_BOOKS_ROUTER,
    MY_LIBRARY_ROUTER,
    MY_PROFILE_EXIT_ROUTER,
    MY_PROFILE_INFO,
} from "../../routing/consts";
import BookListContainer from "../../containers/Profile/BookListContainer";
import AddBookContainer from "../../containers/Profile/AddBookContainer";
import Exit from "./Exit";
import ModalBackground from "../UI/Modal/ModalBackground";
import MyProfile from "./MyProfile/MyProfile";
import {httpOnHttps} from "../../utils/customFunc";
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";
import AuthorContainer from "../../containers/Main/AuthorContainer";
import BlogContainer from "../../containers/Profile/MyBlogContainer";
import ProfileComments from "./ProileComments";
import ModalPayment from "../UI/Modal/ModalPayment";
import {createPayment} from "../../http/paymentAPI";

import likeImg from "../../assets/images/icons/like.svg"
import usersImg from "../../assets/images/icons/users.svg"
import listImg from "../../assets/images/icons/list.svg"
import {useTranslation} from "react-i18next";

const Profile = (props) => {

    const wallets = props.data.wallets;
    const currencyIcons = {
        'USD': '$', 'RUB': '₽', 'EUR': '€',
    }
    const { t } = useTranslation();

    const ProfileInfoComponent = () => {
        return <MyProfile updateProfile={props.updateProfile} requestUser={props.requestUser} user={props.data}/>
    };

    return (<>
        <div
            style={{backgroundImage: `url(${props.data.cover ? 'https://worldofwriter.com' + httpOnHttps(props.data.cover) : bg})`}}
            className={style.coverBg}>
            <div className={style.bgImage}>
                <ModalBackground savePhoto={props.saveBg} username={props.data.username}/>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-xl-3 col-12 order-xl-first order-last">
                    <AdvertisingContainer/>
                    <AuthorContainer/>

                </div>
                <div className="col-xl-9 col-12">
                    <div className="row pb-5">
                        <div className="col-md-3 col-4">
                            <div className={style.profImg}>
                                <img
                                    src={props.data.image ? 'https://worldofwriter.com' + httpOnHttps(props.data.image) : photo}
                                    alt=""/>
                                <div className={style.photoEdit}>
                                    <ModalEditProfilePhoto savePhoto={props.savePhoto} username={props.data.username}/>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <p className="p5">{t('last online')}:</p>
                                <p className="p5 text-end">
                                    {props.data.online ? <span
                                        className='text-success'>{t('Online now')}</span> : (props.data.last_seen ? props.data.last_seen.slice(0, 10) : null)}
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
                                <div><img src={likeImg} alt="likes"/>{t('likes')}  <b>{props.data.likes}</b></div>
                                <div><img style={{width: 23}} src={usersImg}
                                          alt='subscribers'/> {t('subscribers')} <b>{props.data.subscribers}</b></div>
                                <div><img src={listImg} alt="lists"/> {t('lists')} <b>{props.data.author_lists}</b></div>
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            {wallets && <div className={style.balance}>
                                <div className={style.title}>
                                    <p className='p1'>{t('Balance')}</p>
                                </div>
                                {wallets.map((wallet, idx) => (
                                    <div key={idx} className='text-center mt-2'>
                                        <span
                                            className='fw-bold fst-italic'>{`${currencyIcons[wallet.currency]} ${wallet.amount}`}</span>
                                        <br/>
                                        <ModalPayment
                                            desc={t('Pay!')}
                                            title={<><span
                                                className='text-primary fw-bold'>{props.data.username}</span> {t('user account top up')}</>}
                                            button={
                                                <button
                                                    className='my-btn type-1-blue mt-3'
                                                >
                                                    <span> {t('Сontribute')}</span>
                                                </button>}
                                            data={{
                                                currencyIcon: currencyIcons[wallet.currency],
                                            }}
                                            callback={async (amount) => {
                                                let description = t("Replenishment of the user account") + ' ' + props.data.username;
                                                let return_url = window.location.origin + '/user/' + props.data.username;
                                                let response = await createPayment(wallet.currency, amount, description, return_url);
                                                if (response.status === 200) {
                                                    window.open(response.data.confirmation_url)
                                                }
                                            }}/>
                                    </div>))}
                            </div>}
                        </div>
                    </div>
                    <div className="row">
                        <nav className={style.nav}>
                            <ul className={style.tabs}>
                                <li>
                                    <NavLink activeClassName={style.active} to={MY_PROFILE_INFO}>{t("Profile")}</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName={style.active} to={MY_BLOG_ROUTER}>{t("Blog")}</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName={style.active} to={MY_BOOKS_ROUTER}>{t("Books")}</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName={style.active} to={ADD_BOOKS_ROUTER}>{t("Add book")}</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName={style.active} to={MY_LIBRARY_ROUTER}>{t("My library")}</NavLink>
                                </li>
                                {props.data.is_moderator && (props.data.username === localStorage.getItem('username')) &&
                                <li><NavLink activeClassName={style.active} to={MODERATION_ROUTER}>{t("Moderation")}</NavLink>
                                </li>}
                                <li>
                                    <NavLink activeClassName={style.active} to={MY_PROFILE_EXIT_ROUTER}>{t("Exit")}</NavLink>
                                </li>
                            </ul>
                        </nav>
                        <div className={style.pageContent}>
                            <Switch>
                                <Route path={MY_PROFILE_INFO} component={ProfileInfoComponent}/>
                                <Route path={MY_BLOG_ROUTER} component={BlogContainer}/>
                                <Route path={MY_BOOKS_ROUTER} component={BookListContainer}/>
                                <Route path={ADD_BOOKS_ROUTER} component={AddBookContainer}/>
                                <Route path={MY_LIBRARY_ROUTER} component={MyLibraryContainer}/>
                                <Route path={MODERATION_ROUTER} component={ModerationContainer}/>
                                <Route path={MY_PROFILE_EXIT_ROUTER}
                                       component={Exit}/>
                            </Switch>
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


    </>);
};

export default Profile;

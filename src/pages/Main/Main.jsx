import React from 'react';
import style from "./Main.module.scss";
import {Link} from "react-router-dom";
import AdvertSliderContainer from "../../containers/Main/AdvertSliderContainer";
import Top15Container from "../../containers/Main/Top15Container";
import PopularContainer from "../../containers/Main/PopularContainer";
import BestContainer from "../../containers/Main/BestContainer";
import HotContainer from "../../containers/Main/HotContainer";
import {useTranslation} from "react-i18next";
import {ADD_BOOKS_ROUTER, SEARCH_BOOK_ROUTER} from "../../routing/consts";
import ContinueRead from "../../containers/Main/ContinueRead";
import ModalAuth from "../../components/UI/Modal/ModalAuth";
import AuthorContainer from "../../containers/Main/AuthorContainer";
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";

const Main = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className=" ">
                <div>

                    <div className={style.make}>
                        <div className={style.title + ' container'}>
                            <div><h1 className='semibold'>{t('make')} <span className='light'>{t('100_s_of_thousands')}</span>
                                 {t('dollars_annually')} </h1> <p className='p1'>{t('being_an_online_writer')}.</p>
                            </div>

                        </div>
                    </div>

                    <div className={style.searchAndPublic}>
                        <div className='container'>
                            <div className='row p-0 m-0'>
                                <div className={'col-xl-7 col-lg-7 col-md-8 col-12  ' + style.buttons}>
                                    {
                                        localStorage.getItem('username')
                                            ? <Link to={ADD_BOOKS_ROUTER}><button className='my-btn type-4'><span>{t('publish_a_book')}</span></button></Link>
                                            : <ModalAuth button={<button className='my-btn type-4'>
                                                <span>{t('publish_a_book')}</span>
                                            </button>} />
                                    }

                                    <p className='p4 d-inline-block ms-4 me-4'>{t('or')}</p>
                                    <Link to={SEARCH_BOOK_ROUTER}><button  className='my-btn type-5'><span>{t('search_a_book')}</span></button></Link>
                                </div>
                                <div className={'col-xl-5  col-lg-5 col-md-4 col-12 ' + style.text}>
                                    <p className='p5'>{t('Work_hard_from_anywhere_you_want')} </p>
                                    <p className='p5'>{t('Work_hard_anytime_you_want')}</p>
                                    <p className='p5'>{t('Earn_as_much_as_you_want')}</p>
                                    <p className='p5 mt-4'>{t('Keep_your_author_s_rights')}</p>
                                    <div  className={style.line}/>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={style.advAndTop}>
                        <div className='container'>
                            <div className="row m-0 p-0">
                                <div className="col-lg-6 col-12 m-0 p-0">
                                    <div className={style.advert}>
                                        <h3>{t('advertising')}</h3>
                                        <AdvertSliderContainer/>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12 m-0 p-0">
                                    <div className={style.top15}>
                                        <div  className={style.bg}
                                            />
                                        <div className={style.line}
                                            />
                                        <h3>{t('top_15')}</h3>
                                        <div><Top15Container/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className={style.popularAndBest + ' ' + style.popular}>

                            <h3>{t('popular')}</h3>
                            <PopularContainer/>

                            <div className={style.best}>
                                <h3>{t('best_sellers')}</h3>
                                <div  className={style.bg}/>
                                <BestContainer/>

                            </div>
                        </div>
                    </div>

                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-lg-6 col-12 p-0 m-0">
                                <div className={style.action}>
                                    <h3>{t('action')}</h3>
                                    {
                                        localStorage.getItem('username')
                                            ? <ContinueRead />
                                            : <>
                                                <AuthorContainer type='main' />
                                                <AdvertisingContainer type='main' />
                                                </>
                                    }

                                </div>
                            </div>
                            <div className="col-lg-6 col-12 p-0 m-0">
                                <div className={style.hot}>
                                    <h3>{t('hot')}!</h3>
                                    <HotContainer/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.searchMore + ' mt-5 mb-5'}>
                        <div className={style.line}/>
                        <Link to={SEARCH_BOOK_ROUTER}><button className='my-btn type-5'>
                           <span>{t('search_more_books')}</span>
                        </button>
                        </Link>
                    </div>

                    {/*<div className={" row"}>*/}

                    {/*    <div className={' col-lg-3 col-xxl-2 col-12 pe-sm-2 pe-0 ps-sm-2 ps-0'}>*/}
                    {/*        {*/}
                    {/*            localStorage.getItem('username') ? <ContinueRead/>*/}
                    {/*                : null*/}
                    {/*        }*/}

                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>

        </div>
    );
};

export default Main;


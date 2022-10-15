import React from 'react';
import photoProfile from './../../assets/images/profile.jpg'
import style from './Blog.module.scss'
import {Link} from "react-router-dom";
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";
import AuthorContainer from "../../containers/Main/AuthorContainer";
import BookComments from "../Book/BookComments";
import {MAIN_ROUTE, SEARCH_BLOG_ROUTER, USER_ROUTE} from "../../routing/consts";
import {httpOnHttps} from "../../utils/customFunc";
import {useTranslation} from "react-i18next";
import Helmet from "react-helmet";

const Blog = (props) => {
    const { t } = useTranslation();

    return (
        <div className='position-relative mt-4'>
            <Helmet>
                <title>{props.data.title + '- Блог'}</title>
            </Helmet>
            <div className='mb-3'><span className={style.arrow}>{'<'}</span> <span className={style.back}><Link
                to={MAIN_ROUTE}> back </Link></span></div>
            <div className='row mt-4 '>

                <div className="col-xl-9 col-12">
                    <div className={ ' row'}>
                        <div className=' col-lg-1 col-2 p-0'>
                            <div className={style.img}>
                                <img src={props.data.user.image ? httpOnHttps(props.data.user.image) : photoProfile} alt=""/>
                            </div>
                        </div>
                        <div className='col-lg-11  col-10'>
                            <div className='d-flex justify-content-between'>
                                <h1 className={style.title}>{props.data.title}</h1>
                                <div  className='text-secondary fst-italic'>{props.data.created_at.slice(0,10)}</div>
                            </div>
                            <div>{t('Author')}:<Link to={USER_ROUTE+'/'+ props.data.user.username} >  {props.data.user.fullname ? props.data.user.fullname : props.data.user.username}</Link> </div>
                            <div className='mt-3'>
                                <i className="fa fa-eye" aria-hidden="true"/> {props.data.views}

                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className={ ' row'} >
                        <div className={style.theme}><Link to={SEARCH_BLOG_ROUTER+'/'+props.data.theme.id}>{props.data.theme.name}</Link></div>

                        <div className='ck-content'>
                            <div
                                dangerouslySetInnerHTML={{__html: props.data.markdown }}/>
                        </div>
                    </div>
                    <div className={ ' row'}>
                        <BookComments deleteThisComment={props.deleteThisComment} comments={props.comments} bookId={props.data.id} addComment={props.addComment}/>
                    </div>
                </div>
                <div className="col-xl-3 col-12">
                    <AdvertisingContainer/>
                    <AuthorContainer/>
                </div>

            </div>
        </div>

    );
};

export default Blog;
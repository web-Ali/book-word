import React from 'react';
import {BLOG_ROUTE} from "../../../routing/consts";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


const UserBlogItem = ({blog}) => {

    let markdown = blog.markdown.replace(/<img[^>]*>/g, "")
    const { t } = useTranslation();


    return (
        <div style={{ padding: 10}}>
            <div className='text-end'>
                <p className='text-secondary fst-italic'>{blog.created_at.slice(0, 10)}</p>
            </div>
            <div className='mt-3'><h4>{blog.title}</h4></div>
            <p style={{color: '#4582af', fontStyle: 'italic'}}>{blog?.theme.name}</p>
            <hr/>
            <div className='ck-content'>
                <div
                    dangerouslySetInnerHTML={{__html: markdown.length > 300 ? markdown.slice(0, 300) + ' ......' : markdown}}/>
            </div>
            <div className='d-flex justify-content-end mt-3'>
                <Link to={BLOG_ROUTE +'/'+blog.id}><button className='my-btn type-5'><span>{t('Read more')}...</span></button></Link>
            </div>
        </div>
    );
};

export default UserBlogItem;
import React from 'react';
import style from "../../Profile/MyBlog/MyBlog.module.css";
import UserBlogItem from "./UserBlogItem";
import {useTranslation} from "react-i18next";

const UserBlog = (props) => {
    const { t } = useTranslation();

    return (
        <div>
            {props.blogs.length ? <div className={style.blogList }>
                    {props.blogs.map((item) => {
                        return <UserBlogItem
                            key={item.id}
                            blog={item}
                            />
                    })}
                </div> :
                <div className='text-center'>
                    <h4>{t('The user hasn\'t shared anything on the blog yet.')}</h4>
                </div>

            }

        </div>
    );
};

export default UserBlog;
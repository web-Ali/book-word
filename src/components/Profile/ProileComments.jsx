import React, {useState} from 'react';
import style from "../Book/Book.module.scss";
import ProfileCommentsItem from "./ProfileCommentsItem";
import {useTranslation} from "react-i18next";
import ModalAuth from "../UI/Modal/ModalAuth";

const ProfileComments = (props) => {
    const [commentState, setComment]= useState('');
    const send = (comment, parent) =>{
        const formData = new FormData();
        formData.append('text', comment);
        setComment('')
        if (parent !== undefined) {
            formData.append('parent', parent);
        }
        props.addComment(props.username,formData)
    };
    const { t } = useTranslation();

    return (
        <div className={style.commentsWrapper + ' ps-sm-4  ps-0 pe-0'}>
            <h4 className='p-sm-2 p-0'><i className="fas fa-comments" /> {t('Guest book')}</h4>
            <div className={style.buttonAnswer + ' p-sm-4 p-0 ms-0'}>
                <textarea onChange={(e)=>setComment(e.target.value)} value={commentState}  className="my-form w-100" rows="3"/>
                {localStorage.getItem('username') ?
                    <button onClick={()=>send(commentState)} className='my-btn type-1-blue mt-2'><span>{t('comment')}</span></button>
                    :
                    <ModalAuth button={<button className='my-btn type-5 mt-2'><span>{t('Сomment')}</span></button>}/>
                }

            </div>

            {
                props.comments.length ? props.comments.map((item) => {
                    return  <ProfileCommentsItem key={item.id} item={item} username={props.username} addCom={send} deleteThisComment={props.deleteThisComment}/>
                }) : null
            }
        </div>
    );
};

export default ProfileComments;
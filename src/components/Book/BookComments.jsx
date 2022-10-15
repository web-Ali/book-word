import React, {useState} from 'react';
import BookCommentsItem from "./BookCommentsItem";
import style from "./Book.module.scss";
import ModalAuth from "../UI/Modal/ModalAuth";
import {useTranslation} from "react-i18next";

const BookComments = (props) => {
    const [commentState, setComment]= useState('');
    const { t } = useTranslation();

    const send = (comment, parent) =>{
        const formData = new FormData();
        formData.append('text', comment);
        setComment('')
        if (parent !== undefined) {
            formData.append('parent', parent);
        }
        props.addComment(props.bookId,formData)
    };

    return (
        <div className={style.commentsWrapper + ' ps-sm-4  ps-0 pe-0'}>
            <h4 className='p-2'><i className="fas fa-comments" /> {t('Comments')}</h4>
            <div className={style.buttonAnswer + ' p-sm-4 p-0 ms-0'}>
                <textarea onChange={(e)=>setComment(e.target.value)} value={commentState}  className="my-form w-100 " rows="3"/>
                {localStorage.getItem('username') ?
                    <button onClick={()=>send(commentState)} className='my-btn type-1-blue mt-2'><span>@ {t('Сomment')}</span></button>
                :
                    <ModalAuth button={<button className='my-btn type-1-blue mt-2'><span>@ {t('Сomment')}</span></button>}/>
                }

            </div>

            {
                props.comments.length ? props.comments.map((item) => {
                    return  <BookCommentsItem key={item.id} bookId={props.bookId} item={item} addCom={send} deleteThisComment={props.deleteThisComment}/>
                }) : null
            }
        </div>
    );
};

export default BookComments;
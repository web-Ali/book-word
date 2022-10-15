import React, {useState} from 'react';
import ModalAuth from "../UI/Modal/ModalAuth";
import {useTranslation} from "react-i18next";

const AddAnswerCommentBook = ({addCom, comId ,username,offAnswerInput}) => {
    const [text,setText] = useState();
    const { t } = useTranslation();

    const send = () =>{
        if (text){

            addCom(text, comId)
            setText('')
            offAnswerInput(false)
        }

    }
    return (
        <div>
            <div className=''>
                <textarea defaultValue={username+', '} onChange={(e)=>setText(e.target.value)} className="form-control" rows="3"/>
                <div className='text-end'>
                    {localStorage.getItem('username') ?
                        <button onClick={send} className='my-btn type-5 mt-2 '><span>{t('Send')}</span></button>
                        :
                        <ModalAuth button={<button className='my-btn type-5 mt-2 '><span>{t('Send')}</span></button>}/>
                    }

                </div>
            </div>
        </div>
    );
};

export default AddAnswerCommentBook;
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

const AddAnswerCommentBook = ({addCom,commentId,username,offAnswerInput}) => {
    const [text,setText] = useState();
    const send = () =>{
        if (text){
            addCom(text,commentId)
            setText('')
            offAnswerInput(false)
        }

    }
    const { t } = useTranslation();

    return (
        <div>
            <div className=''>
                <textarea defaultValue={username+', '} onChange={(e)=>setText(e.target.value)} className="form-control" rows="3"/>
                <div className='text-end'>
                    <button onClick={send} className='my-btn type-1-blue mt-2 '><span>{t('Send')}</span></button>
                </div>
            </div>
        </div>
    );
};

export default AddAnswerCommentBook;
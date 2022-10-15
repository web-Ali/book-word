import React, {useEffect, useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {CKEditor} from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {BOOK_ROUTE, READER_ROUTER} from "../../routing/consts";
import ModalAccept from "../UI/Modal/ModalAccept";
import {useTranslation} from "react-i18next";

const EditChapter = ({data,save,bookid,chapterid,error,deletedChapter}) => {

    const [name, setName] = useState('')
    const [contentData, setData] = useState('')
    const [paid, setPaid] = useState(data.paid)
    const { t } = useTranslation();


    const history = useHistory();

    useEffect(()=>{
        setName(data.name);
    },[data.name])

    useEffect(()=>{
        setData(data.markdown);
    },[data.markdown])

    useEffect(()=>{
        setPaid(data.paid);
    },[data.paid])

    const ckeditorstate = (event, editor) => {
        const data = editor.getData();
        setData(data);
        // console.log("STATE", {data})
    }
    const deletedChapterCall  = () => {

        deletedChapter(bookid, chapterid);

    }

    const editorConfiguration = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'link',
                'alignment',
                'bulletedList',
                'numberedList',
                'todoList',
                '|',
                'imageInsert',
                'insertTable',
                'blockQuote',
                'undo',
                'redo',
                'horizontalLine',
                'removeFormat',
                'specialCharacters',
                'findAndReplace',
                '|'
            ]
        },
        language: 'en',
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },
        image: {
            toolbar: [
                'imageStyle:block',
                'imageStyle:side',
                'imageStyle:inline', 'imageStyle:alignLeft', 'imageStyle:alignRight',
                'imageStyle:alignCenter', 'imageStyle:alignBlockLeft', 'imageStyle:alignBlockRight',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
            ]
        }
    };

    const onSubmit = async () => {

        const formData = new FormData();


        formData.append("name", name);
        formData.append("markdown", contentData);
        formData.append("paid", paid);
        formData.append("book", bookid);
        save(bookid,chapterid,formData);
        history.push(READER_ROUTER+'/'+bookid+'/'+chapterid)
    };
    return (
        <div className="container">
            <div className="wrapper mt-4">
                <NavLink to={BOOK_ROUTE + '/' + bookid}>
                    <button className='my-btn type-1-blue me-3 mt-sm-0 mt-1 btn'>
                        <span><i className="fa fa-book" aria-hidden="true"/> {t('Back to book')}</span>
                    </button>
                </NavLink>
                <h2 className='mt-4'>{t('Edit chapter')}</h2>
                <p>{error}</p>
                <hr/>
                <div className="form-group">
                    <div className='my-form mt-3'>
                        <input defaultValue={name}
                               onChange={e => setName(e.target.value)}
                               type="text"
                               placeholder=""
                               className='w-100'
                        />
                        <label >{t('Chapter name')}</label>
                    </div>

                    <br/><br/>
                    <label>{t('Text Content')}</label>

                        <CKEditor
                            editor={Editor}
                            // data={contentData}
                            onReady={ editor => {
                                editor?.data.set(contentData)
                            } }
                            onChange={ckeditorstate}
                            config={editorConfiguration}
                        />


                    <label className='form-check-label mt-4'>
                        <input type="checkbox"
                               defaultChecked={paid}
                               className='form-check-input'
                               id="flexCheckChecked"
                               onChange={(e) => {
                                   setPaid(e.target.checked)
                               }}

                        /> {t('Paid')}:
                    </label>
                </div>
                <div className="d-flex justify-content-between">
                    <button className="my-btn type-5 mt-2 ps-5 pe-5 btn-primary" onClick={onSubmit}><span>{t('Save')}</span></button>

                    <ModalAccept
                        button={<button className="my-btn type-4 ps-5 pe-5 mt-2  " ><span>{t('Delete')}</span> </button>}
                        text= {t('Are you sure you want to delete the chapter?')}
                        desc={t('The chapter will be permanently deleted!')}
                        call={deletedChapterCall}
                    />

                </div>
            </div>
        </div>
    );
}

export default EditChapter


import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

import {CKEditor} from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {BOOK_ROUTE} from "../../routing/consts";
import {addChapter} from "../../http/chapterAPI";
import {useTranslation} from "react-i18next";

const AddChapter = ({bookid}) => {

    const [name, setName] = useState('')
    const [paid, setPaid] = useState('')

    // const [addedData, showData] = useState(0)
    const [contentData, setData] = useState('')
    const { t } = useTranslation();

    const history = useHistory()

    const ckeditorstate = (event, editor) => {
        const data = editor.getData();
        setData(data);
        // console.log("STATE", {data})
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
        for (let value of formData.values()) {
            console.log(value);
        }

        try {
            let response = await addChapter(formData,bookid);

            if(response.status===201){
                history.push(BOOK_ROUTE+'/'+bookid)
                setName('')
                setData('')
            }
        } catch (e) {
            console.log(e.response)
        }
    };
    return (
        <div className="container">
            <div className="wrapper pt-4">
                <h1>New chapter</h1>
                <hr/>
                <div className="form-group">
                    <div className='my-form mt-3'>
                        <input value={name}
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
                        // onInit={editor => {
                        //     //// Here the editor is ready to be used
                        // }}
                        onChange={ckeditorstate}

                        config={editorConfiguration}

                    />
                    <label className='form-check-label mt-4'>
                        <input type="checkbox"
                               checked={paid}
                               className='form-check-input'
                               id="flexCheckChecked"
                               onChange={(e) => {
                                   setPaid(e.target.checked)
                               }}

                        /> {t('Paid')}:
                    </label>
                </div>
                <div className="form-group">
                    <button className="my-btn type-5 mt-2 w-100 " onClick={onSubmit}><span>{t('Add')}</span></button>
                </div>

            </div>
        </div>
    );
}

export default AddChapter


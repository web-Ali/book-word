import React, {useState} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import style from './MyBlog.module.css'
import Loader from "../../Loader/Loader";
import MyBlogItem from "./MyBlogItem";
import {useTranslation} from "react-i18next";
import Select from "react-select";

const MyBlog = (props) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [theme, setTheme] = useState(props.themes[0].id)
    const [addBlogMode, setAddBlogMode] = useState(false)
    const [msg, setMsg] = useState('')
    const [lang, setLang] = useState(false);
    const langList = [
        {value: (localStorage.getItem('i18nextLng') === 'ru' ? 'ru' : 'en'), label: (localStorage.getItem('i18nextLng') === 'ru' ? 'Russian' : 'English')},
        {value: (localStorage.getItem('i18nextLng') === 'en' ? 'ru' : 'en'), label: (localStorage.getItem('i18nextLng') === 'en' ? 'Russian' : 'English')}
    ]
    const { t } = useTranslation();

    const ckeditorstate = (event, editor) => {
        const data = editor.getData();
        setText(data);
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
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? '#FCE7D5' : '#FFF4EB',
            background: !state.isFocused ? '#FF1F62' : 'linear-gradient(227.89deg, #FF4C1F -20.42%, #FF1F62 157.32%);',
            borderBottom: '1px solid #352983',
            cursor: 'pointer'
        }),
        control: (provided, state) => ({
            ...provided,
            color: '#1F1F1C',
            border: 0,
            background: '#FCE7D5'
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#1F1F1C',
            padding: 3,
            fontSize: 18,
        }),
        input: (provided, state) => ({
            ...provided,
            color: '#1F1F1C',
            padding: 3,
            fontSize: 18,
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#1F1F1C',
            fontSize: 18,
            padding: 3
        }),
        multiValue: (provided, state) => ({
            ...provided,
            color: '#352983',
            background: '#FCE7D5',
            fontSize: 16,
            padding: 3
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: '#352983'
        }),
        clearIndicator: (provided, state) => ({
            ...provided,
            color: '#352983'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#352983'
        }),
        container: (provided, state) => ({
            ...provided,
            border: '1px solid #352983'
        }),
        menu: (provided, state) => ({
            ...provided,
            border: 0,
            marginTop: 0,
            background: 'linear-gradient(227.89deg, #FF4C1F -20.42%, #FF1F62 157.32%);'
        }),

    }
    const send = () => {
        let data = {
            "theme": theme,
            "title": title,
            "markdown": text,
            "lang": lang ? lang.value : localStorage.getItem('i18nextLng')
        }
        if (theme && title.trim() && text.trim()) {
            if(title.trim().length > 255){
                setMsg(t('The maximum length of the title is 255 characters'))
            }else{
                props.addBlog(data)
                setMsg('')
            }

        } else {
            setMsg(t('Fill in the blank fields'))
        }
    }
    return (
        <>
            <div className='text-end mt-3'>
                <button onClick={()=>setAddBlogMode(prev=> !prev)} className='my-btn type-1-blue'>
                    <span>{t('Add new')} {addBlogMode ? '-' : '+'}</span>
                </button>
            </div>
            {addBlogMode ?
                <div className={style.addBlog}>
                    {msg ? <p className={style.title + ' text-danger'}>{msg}</p> : null}
                    <p className={style.title}>Title</p>
                    <div className='my-form'>
                        <input
                            className='form-control'
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                    </div>


                    <p className={style.title}>{t('Select a theme')}</p>

                    {props.themes.length ?
                        <div className='my-form'><select defaultValue={props.themes[0].id}
                                onChange={(e) => setTheme(e.target.value)}
                                className="form-select"
                                aria-label="Default select example">
                            {props.themes.map((a) => {
                                return <option key={a.id} value={a.id}>{a.name}</option>
                            })}

                        </select></div> : <Loader fix={false}/>

                    }

                    <p className={style.title}>{t('Blog text')}</p>

                    <CKEditor
                        editor={Editor}
                        onChange={ckeditorstate}
                        config={editorConfiguration}
                    />

                    <div className="my-form mt-3">
                        <Select
                            onChange={(selectedOption) => {
                                setLang(selectedOption);
                            }}

                            value={lang}
                            styles={customStyles}
                            options={langList}
                            placeholder={t('language') + ' (' + localStorage.getItem('i18nextLng') +')'}
                        />
                    </div>

                    <div className='text-end'>
                        <button onClick={send} className='my-btn type-1-blue mt-4'><span>{t('To publish')}</span></button>
                    </div>

                </div>
                :
                null
            }
            {props.blogs.length ? <div className={style.blogList }>
                {props.blogs.map((item) => {
                    return <MyBlogItem
                        themes={props.themes}
                        updateBlog={props.updateBlog}
                        editorConfiguration={editorConfiguration}
                        key={item.id}
                        blog={item}
                        deleteBlog={props.deleteBlog} />
                })}
            </div> :
                <div className='text-center'>
                    <p className='p1 p-2'>{t('Share your thoughts on the blog')}</p>
                </div>

            }

        </>
    );
};

export default MyBlog;
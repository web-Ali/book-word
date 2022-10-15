import React, {useEffect, useState} from 'react';
import Select from "react-select";
import style from './Search.module.scss'
import {BLOG_ROUTE, MAIN_ROUTE, SEARCH_BLOG_ROUTER, USER_ROUTE} from "../../routing/consts";
import {Link, NavLink, useHistory} from "react-router-dom";
import profilePhoto from './../../assets/images/profile.jpg'
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";
import {httpOnHttps} from "../../utils/customFunc";
import AuthorContainer from "../../containers/Main/AuthorContainer";
import {useTranslation} from "react-i18next";
import Helmet from "react-helmet";

const SearchBlog = (props) => {
    const [themes, setThemes] = useState('')
    const [text, setText] = useState('')

    const history = useHistory();

    useEffect(()=>{
        window.scrollTo(0,100)
    },[props.search.results])

    let themesOption = props.themes.map((item)=>{
        return {value: item.id, label: item.name}
    })
    const reqSearch = () => {

        history.push(SEARCH_BLOG_ROUTER + '/'
            + (themes.value ? themes.value : 0) + '/'
            + (text ? text : 0)
        )

    }
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
            color: '#FFF4EB',
            border: 0,
            background: 'linear-gradient(227.89deg, #FF4C1F -20.42%, #FF1F62 157.32%);'
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#FFF4EB',
            fontSize: 18,
        }),
        input: (provided, state) => ({
            ...provided,
            color: '#FFF4EB',

            fontSize: 18,
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#FFF4EB',
            fontSize: 18,
        }),
        clearIndicator: (provided, state) => ({
            ...provided,
            color: '#FFF4EB'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#FFF4EB'
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
    const { t } = useTranslation();

    return (
        <div className='container mt-4' >
            <Helmet>
                <title>Блог</title>
            </Helmet>
            <div className={style.navRow + ' mb-4'}>
                <Link to={MAIN_ROUTE}><div>{t('main page')}</div></Link>
                <div>→</div>
                <div>{t('community')}</div>
            </div>
            <div className="row">
                <div className="col-xl-9 col-12 ">

                    <div className={' row mb-5'}>

                        <div className="col-md-3 col-12 p-0 m-0">
                            <Select
                                onChange={(selectedOption) => {
                                    setThemes(selectedOption);
                                }}
                                value={themes}
                                styles={customStyles}
                                options={themesOption}
                                placeholder={t('select theme')}
                            />
                        </div>
                        <div className="col-md-7 col-12 p-0 m-0">
                            <div className="my-form" style={{height: '100%'}}>
                            <input defaultValue={text}
                                   type="text"
                                   onChange={(e)=> setText(e.target.value)}
                                   className='w-100'
                                   placeholder={t('query string')}
                                   style={{height: '100%'}}
                            />
                            </div>
                        </div>
                        <div className="col-md-2 col-12 p-0 m-0">
                            <button onClick={reqSearch} style={{height: '100%'}} className='w-100 my-btn type-4'><span><p className='p5'><i className="fas fa-search" /></p></span></button>
                        </div>
                        <div>
                            {(props.searchText && props.searchText != 0 ) ?
                                <h4  className='fst-italic mt-3'>{t('Query string')}: {props.searchText}</h4>
                                : null}
                        </div>
                    </div>
                    <div className={' row'}>

                        {props.search.results.length > 0 ?  props.search.results.map((blog)=>{
                            let markdown = blog.markdown.replace(/<img[^>]*>/g, "")
                            return <div key={blog.id} className={style.blogItem}>
                                <div className='row mt-2 ms-2'>
                                    <div className={style.blogImg + ' col-lg-1 col-2 p-0'}>
                                        <Link to={USER_ROUTE+'/'+blog.user.username}>
                                            <img src={blog.user.image ? httpOnHttps(blog.user.image) : profilePhoto} alt=""/>
                                        </Link>
                                    </div>
                                    <div className='col-lg-11 col-10'>
                                        <div className='d-flex justify-content-between'>
                                            <div className={style.title}>
                                                <NavLink
                                                    to={BLOG_ROUTE + '/' + blog.id}><p className='p2'>{blog.title}</p></NavLink>
                                            </div>
                                            <div className='text-secondary fst-italic'>
                                                {blog.created_at.slice(0,10)}
                                            </div>
                                        </div>

                                        <div className='mt-2'>{t('Author')}: &nbsp;
                                            <Link to={USER_ROUTE+'/'+blog.user.username}>
                                                {blog.user.fullname ? blog.user.fullname : blog.user.username}
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                                <hr/>
                                <h6 className='fw-bold ps-3'>{blog.theme.name}</h6>
                                <div className='ck-content p-3'>
                                    <div
                                        dangerouslySetInnerHTML={{__html: markdown.length > 300 ?
                                                markdown.slice(0, 400) + ' ......' : markdown}}
                                    />
                                </div>
                                <div className='d-flex justify-content-end mt-3'>
                                    <Link to={BLOG_ROUTE +'/'+blog.id}><button className='my-btn type-1-blue'><span>{t('Read more')}...</span></button></Link>
                                </div>


                            </div>
                        })
                            :
                            <div className={' text-center fw-bold'}>{t('No result')}</div>

                        }
                        {
                            !props.isFetching && (props.search.previous || props.search.next) &&
                            <div className=' d-flex justify-content-between mt-4 mb-4'>
                                {
                                    props.search.previous ?
                                        <button
                                            onClick={() => {
                                                props.searchNext(props.search.previous.slice(props.search.previous.indexOf("blog/?") + 6))
                                            }}
                                            className={style.btn + ' my-btn type-1-blue  m-0'}>
                                            <span>← {t('Previous')}</span>
                                        </button>
                                        :
                                        <div></div>
                                }
                                {
                                    props.search.next ?
                                        <button
                                            onClick={() => {
                                                props.searchNext(props.search.next.slice(props.search.next.indexOf("blog/?") + 6))
                                            }}
                                            className={style.btn + ' my-btn type-1-blue  m-0'}>
                                            <span>{t('Next')} →</span>
                                        </button>
                                        :
                                        <div></div>
                                }

                            </div>
                        }
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

export default SearchBlog;
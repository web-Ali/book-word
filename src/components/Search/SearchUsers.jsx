import React, {useEffect, useState} from 'react';
import style from "./Search.module.scss";
import Select from "react-select";
import {Link, useHistory} from "react-router-dom";
import {MAIN_ROUTE, SEARCH_USER_ROUTER, USER_ROUTE} from "../../routing/consts";
import {httpOnHttps} from "../../utils/customFunc";

import profilePhoto from "../../assets/images/profile.jpg";
import AdvertisingContainer from "../../containers/Advertising/AdvertisingContainer";
import Loader from "../Loader/Loader";
import AuthorContainer from "../../containers/Main/AuthorContainer";
import raitingPhoto from '../../assets/images/icons/raiting.svg'
import likePhoto from '../../assets/images/icons/like.svg'
import {ReactComponent as  SubPhoto}from '../../assets/images/icons/users.svg'
import {useTranslation} from "react-i18next";
import Helmet from "react-helmet";

const SearchUsers = (props) => {
    const [sort, setSort] = useState('')
    const [text, setText] = useState('')
    const { t } = useTranslation();

    const history = useHistory();

    useEffect(()=>{
        window.scrollTo(0,100)
    },[props.searchResult.results])


    const reqSearch = () => {

        history.push(SEARCH_USER_ROUTER + '/'
            + (sort.value ? sort.value : 0) + '/'
            + (text ? text : 0)
        )

    }
    let sortOption = [
        {value: 'username', label:  t('username') + ' ↑'},
        {value: '-username', label: t('username') + ' ↓'},
        {value: 'rating', label: t('rating') + ' ↑'},
        {value: '-rating', label: t('rating')+ ' ↓'},
        {value: 'subscribers', label: t('subscribers') + ' ↑'},
        {value: '-subscribers', label: t('subscribers') + ' ↓'},

    ]
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
    return (
        <div className='container mt-4 ' >
            <Helmet>
                <title>Пользователи</title>
            </Helmet>
            <div className={style.navRow + ' mb-4'}>
                <Link to={MAIN_ROUTE}><div>{t('main page')}</div></Link>
                <div>→</div>
                <div>{t('authors')}</div>
            </div>
            <div className="row">
                <div className="col-xl-9 col-12">

                    <div className={' row mb-5'}>
                        <div className="col-md-3 col-12 p-0 m-0">
                            <Select
                                onChange={(selectedOption) => {
                                    setSort(selectedOption);
                                }}
                                value={sort}
                                styles={customStyles}
                                options={sortOption}
                                placeholder={t('select sort')}
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
                    <div className={'row ' }>
                        {props.isFetching && <div className='text-center'><Loader fix={false} /></div>}
                        {props.searchResult.results.length > 0 ?  props.searchResult.results.map((user)=>{
                                return <div key={user.id} className={style.userItem + ' col-sm-6 col-12 mb-3' }>
                                    <div className='d-flex flex-row'>
                                        <div className={style.userSearchImg}>
                                            <Link to={USER_ROUTE + '/'+user.username} >
                                            <img src={user.image ? httpOnHttps(user.image) : profilePhoto } alt={user.username}/>
                                            </Link>
                                        </div>
                                        <div className='ms-3'>
                                            <div className='fw-bold fst-italic'>{user.username}</div>
                                            <div><Link to={USER_ROUTE + '/'+user.username} >{user.fullname}</Link></div>
                                            <div className={style.stats}>
                                                <span>
                                                    <img style={{width: 15}} src={raitingPhoto} alt=""/> {user.rating}
                                                </span> <span>
                                                    <SubPhoto className={style.svg} width='22px' /> {user.subscribers}
                                                </span>  <span>
                                                    <img style={{width: 15}} src={likePhoto} alt=""/> {user.likes}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                            :
                            <div className={style.content+ ' text-center fw-bold'}>{t('No result')}</div>

                        }
                        {
                            !props.isFetching && (props.searchResult.previous || props.searchResult.next) &&
                            <div className=' d-flex justify-content-between mt-4 mb-4'>
                                {
                                    props.searchResult.previous ?
                                        <button
                                            onClick={() => {
                                                props.searchNext(props.searchResult.previous.slice(props.searchResult.previous.indexOf("users/?") + 7))
                                            }}
                                            className={style.btn + ' my-btn type-1-blue  m-0'}>
                                        <span>← {t('Previous')}</span>
                                        </button>
                                        :
                                        <div></div>
                                }
                                {
                                    props.searchResult.next ?
                                        <button
                                            onClick={() => {
                                                props.searchNext(props.searchResult.next.slice(props.searchResult.next.indexOf("users/?") + 7))
                                            }}
                                            className={style.btn + ' my-btn type-1-blue  m-0'}>
                                           <span> {t('Next')} →</span>
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

export default SearchUsers;
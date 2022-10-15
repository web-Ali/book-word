import React, {useEffect, useState} from 'react';
import style from './Search.module.scss';
import Select from "react-select";
import {Link, NavLink, useHistory} from "react-router-dom";
import photo from "../../assets/images/unnamed.png";
import Loader from "../Loader/Loader";
import {BOOK_ROUTE, MAIN_ROUTE, SEARCH_BOOK_ROUTER, USER_ROUTE} from "../../routing/consts";
import Hyphenated from "react-hyphen";
import {httpOnHttps, nameLengthSlice} from "../../utils/customFunc";
import {useTranslation} from "react-i18next";
import Helmet from "react-helmet";

const SearchBooks = (props) => {
    const { t } = useTranslation();
    const [genre, setGenre] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [tags, setTags] = useState([]);
    const [paid, setPaid] = useState("");
    const [genreList, setGenreList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const paidList = [
        {value: 0, label: t('paid/free')},
        {value: 1, label: t('paid')},
        {value: 2, label: t('free')}
    ]


    const history = useHistory();
    useEffect(() => {
        window.scrollTo(0, 100)
    }, [props.search.results])

    useEffect(() => {
        let tempForm = [{value: 0, label: t('form')}];
        let tempGenre = [{value: 0, label: t('genre')}];
        let tempTags = [];
        if (Array.isArray(props.bookInfo.bookForms) && props.bookInfo.bookForms.length) {
            props.bookInfo.bookForms.map((a) => {
                tempForm.push({value: a.pk, label: t(a.form)})
            })
            setTypeList(tempForm)
        }
        if (Array.isArray(props.bookInfo.tags) && props.bookInfo.tags.length) {
            props.bookInfo.tags.map((a) => {
                tempTags.push({value: a.pk, label: a.tag})
            })
            setTagsList(tempTags)
        }
        if (Array.isArray(props.bookInfo.genres) && props.bookInfo.genres.length) {
            props.bookInfo.genres.map((a) => {
                tempGenre.push({value: a.pk, label: a.genre})
            })
            setGenreList(tempGenre)
        }
    }, [props.bookInfo])


    const reqSearch = () => {
        let tagsString = 0;
        if (tags.length > 0) {
            tags.map(a => {
                tagsString = tagsString + a.value + '-';
            })
            tagsString = tagsString.slice(0, -1);

        }
        history.push(SEARCH_BOOK_ROUTER + '/'
            + (type.value ? type.value : 0) + '/'
            + (genre.value ? genre.value : 0) + '/'
            + (name ? name : 0) + '/'
            + tagsString + '/'
            // + (lang.value ? lang.value : localStorage.getItem('i18nextLng')) + '/'
            + (paid.value ? paid.value : 0)
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
            padding: 10,
            fontSize: 18,
        }),
        input: (provided, state) => ({
            ...provided,
            color: '#FFF4EB',
            padding: 10,
            fontSize: 18,
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#FFF4EB',
            fontSize: 18,
            padding: 10
        }),
        multiValue: (provided, state) => ({
            ...provided,
            color: '#352983',
            background: '#FCE7D5',
            fontSize: 16,
            padding: 5
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: '#352983'
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
        <div>
            <Helmet>
                <title>Все книги</title>
            </Helmet>
            <div className="container mt-4 mb-4">
                <div className={style.navRow}>
                    <Link to={MAIN_ROUTE}>
                        <div>{t('main page')}</div>
                    </Link>
                    <div>→</div>
                    <div>{t('more book')}</div>
                </div>
            </div>
            <div className={style.wrapper + " container  mt-3 "}>
                <div className={style.filterLeft}>
                    <div className="my-form">
                        <Select
                            onChange={(selectedOption) => {
                                setGenre(selectedOption);
                            }}
                            styles={customStyles}
                            value={genre}
                            options={genreList}
                            placeholder={t('genre')}
                        />
                    </div>
                    <div className="my-form">
                        <Select
                            onChange={(selectedOption) => {
                                setType(selectedOption);
                            }}
                            value={type}
                            styles={customStyles}

                            options={typeList}
                            placeholder={t('form')}
                        />
                    </div>

                    <div className="my-form">
                        <Select
                            onChange={(selectedOption) => {
                                setTags(selectedOption);
                            }}
                            value={tags}
                            isMulti
                            styles={customStyles}

                            options={tagsList}
                            placeholder={t('select tags')}
                        />
                    </div>
                    <div className="my-form ">
                        <Select
                            onChange={(selectedOption) => {
                                setPaid(selectedOption);
                            }}
                            value={paid}
                            styles={customStyles}
                            options={paidList}
                            placeholder={t('paid/free')}
                        />

                    </div>


                </div>


                <div className={style.filter}>

                    <div className={style.searchRow}>
                        <div className="">
                            <div className="my-form">
                                <input type="text" style={{padding: 10}} value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       placeholder='name' className=' w-100 '/>
                            </div>

                        </div>

                        <div className="">
                            <button onClick={reqSearch} style={{height: '100%'}}
                                    className='my-btn type-4 w-100 p-0 m-0'><span
                                className='p-0 m-0'>{t('Search')}</span></button>
                        </div>
                    </div>
                    <div className="mb-5">
                        {
                            props.isFetching ? <Loader fix={false}/> :
                                <>
                                    <div className={style.bookItemsContainer}>
                                        {Array.isArray(props.search.results) && props.search.results.map((a, index) => {
                                            return (
                                                <div key={index} className={style.item}>
                                                    <div className={style.bookform}>{a?.form.form} </div>
                                                    <div className={style.image}>
                                                        <NavLink to={BOOK_ROUTE + '/' + a.id}><img
                                                            src={a.cover ? httpOnHttps(a.cover) : photo}
                                                            alt={a.name}/></NavLink>
                                                    </div>
                                                    <div className={style.author}>
                                                        <NavLink
                                                            to={USER_ROUTE + '/' + a.user.username}>
                                                            {a.user.fullname ? a.user.fullname : a.user.username}
                                                        </NavLink>
                                                    </div>
                                                    <div className={style.title}>
                                                        <Hyphenated>
                                                            <NavLink
                                                                to={BOOK_ROUTE + '/' + a.id}>{nameLengthSlice(a.name, 30)}</NavLink>
                                                        </Hyphenated>

                                                    </div>
                                                    <div className={style.likeCost}>
                                                        <span>
                                                            <i className="fas fa-heart" style={{color: 'red', cursor: 'default'}}/> {a.likes}
                                                        </span>

                                                        <span>
                                                            {a.price}{t('$')}
                                                        </span>

                                                    </div>


                                                </div>

                                            )
                                        })}
                                    </div>
                                </>
                        }
                        {
                            !props.isFetching &&
                            <div className='d-flex justify-content-between mt-4'>
                                {
                                    props.search.previous ?
                                        <button
                                            onClick={() => {
                                                props.searchNext(props.search.previous.slice(props.search.previous.indexOf("books/?") + 7))
                                            }}
                                            className={style.btn + '  my-btn type-1-blue  m-0'}>
                                            <span>← {t('Previous')}</span>
                                        </button>
                                        :
                                        <div></div>
                                }
                                {
                                    props.search.next ?
                                        <button
                                            onClick={() => {
                                                props.searchNext(props.search.next.slice(props.search.next.indexOf("books/?") + 7))
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
            </div>
        </div>
    );
};

export default SearchBooks;
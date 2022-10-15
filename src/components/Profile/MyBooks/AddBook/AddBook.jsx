import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {addBook} from "../../../../http/booksAPI";
import Select from "react-select";
import style from "./AddBook.module.scss";
import {BOOK_ROUTE} from "../../../../routing/consts";
import TagItem from "./TagItem";
import DelTag from "./DelTag";
import {useTranslation} from "react-i18next";


const AddBook = (props) => {
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [ageLimit, setAgeLimit] = useState("");
    const [description, setDescription] = useState("");
    // const [file, setFile] = useState("");
    const [genre, setGenre] = useState("");
    const [type, setType] = useState("");
    const [tags, setTags] = useState([]);
    const [price, setPrice] = useState(0);
    const [tagInput, setTagInput] = useState('');
    const [showTagList, setShowTagList] = useState(false);
    const [paid, setPaid] = useState(false);
    const [lang, setLang] = useState(false);
    const langList = [
        {value: (localStorage.getItem('i18nextLng') === 'ru' ? 'ru' : 'en'), label: (localStorage.getItem('i18nextLng') === 'ru' ? 'Russian' : 'English')},
        {value: (localStorage.getItem('i18nextLng') === 'en' ? 'ru' : 'en'), label: (localStorage.getItem('i18nextLng') === 'en' ? 'Russian' : 'English')}
    ]
    const history = useHistory();

    const typeList = [];
    const genreList = [];
    const [tagsList, setTagsList] = useState([]);
    const tagsListMain = [];
    let newTagsList = [];


    if (props.props?.bookForms) {
        props.props.bookForms.map((a) => {
            typeList.push({value: a.pk, label: a.form})
        })
    }
    if (props.props?.genres) {
        props.props.genres.map((a) => {
            genreList.push({value: a.pk, label: a.genre})
        })
    }
    if (props.props?.tags) {
        props.props.tags.map((a) => {
            tagsListMain.push({value: a.pk, label: a.tag})
        })
    }
    if (props?.newTags) {
        props.newTags.map((a) => {

            newTagsList.push({value: a.id, label: a.tag})
            newTagsList = newTagsList.filter(
                (thing, index, self) =>
                    self.findIndex((t) => t.value === thing.value && t.tag === thing.tag) === index
            )
        })
    }else{
        newTagsList= []
    }


    const onSubmit = async () => {
        setMsg('');
        const formData = {};
        if (genre) {
            formData.genre = genre.map(a => a.value);
        }
        if(tags.length && newTagsList.length){
            formData.tags = tags.map(a => a.value);
            newTagsList.map(a => formData.tags.push(a.value) );
        }else if (tags.length) {
            formData.tags = tags.map(a => a.value);
        }else if (newTagsList.length) {
            formData.tags = newTagsList.map(a => a.value);
        }

        if (paid) {
            formData.price = price;
        }
        formData.name = name;
        formData.lang = lang ? lang.value : localStorage.getItem('i18nextLng');
        formData.age_limit = ageLimit;
        formData.form = type.value;
        formData.description = description;
        try {
            let response = await addBook(formData);
            if (response.status === 201) {
                props.cleanNewTag()
                history.push(BOOK_ROUTE + '/' + response.data.id)
            }
        } catch (e) {
            setMsg('Произошла ошибка при вводе данных')
        }
    };

    const tagsListChange = (e) => {
        setTagInput(e.target.value)
        let tempTagList = tagsListMain.filter(i =>
            i.label.toLowerCase().includes(e.target.value.toLowerCase())
        )

        for (let i=0; i < tags.length; i++){
            removeByAttr(tempTagList, 'value', tags[i].value);
        }
        // const results = tempTagList.filter(({ value: id1 }) => !tagsList.some(({ value: id2 }) => id2 === id1));

        setTagsList(tempTagList)
    }
    const tagsInputTouch = () =>{
        let tempTagList = [...tagsListMain]
        for (let i=0; i < tags.length; i++){
            removeByAttr(tempTagList, 'value', tags[i].value);
        }
        setTagsList(tempTagList);
        setShowTagList(true)
    }
    const addNewTag = () =>{
        try {
            let tagData = new FormData();
            tagData.append('tag',tagInput)
            props.addTag(tagData);
            setTagInput('')
        }catch (e) {
            console.log(e.response);
        }
    }
    function removeByAttr(arr, attr, value){
        let i = arr.length;
        while(i--){
            if( arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value ) ){

                arr.splice(i,1);

            }
        }
        return arr;
    }
    const addTag = (value) => {
        setTags([...tags, {value: value.value, label: value.label}])
        setTagInput('')
    }
    const delTag = (tag) => {
        setTags(tags.filter(value => value.value !== tag))
    }
    const deleteNewTag = (tag) => {
        props.delNewTag(tag);
        setTagInput('')
    }
    const inputAge = (e)=>{
         setAgeLimit(prev => e.target.validity.valid && (e.target.value.length < 3) ? e.target.value : prev)
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
    const { t } = useTranslation();

    return (
        <div className={style.wrapper}>
            <h4 className='text-danger'>{msg}</h4>
            <Select
                onChange={(selectedOption) => {
                    setType(selectedOption);
                }}
                value={type}
                styles={customStyles}
                options={typeList}
                placeholder={t('select book form')}
            />
            <div className='my-form mt-3'>
                <input value={name}
                       onChange={e => setName(e.target.value)}
                       type="text"
                       placeholder=""
                       className='w-100'
                />
                <label >{t('nameBook')}</label>
            </div>

            <div className='my-form mt-3 mb-3'>
                <textarea value={description}
                       onChange={e => setDescription(e.target.value)}
                       style={{height: 200}}
                       placeholder=""
                       className='w-100'
                />
                <label >{t('description')}</label>
            </div>

            {/*<input onChange={(e) => setFile(e.target.files[0])}  className='form-control mb-3' type="file" placeholder="cover"  />*/}

            <Select
                onChange={(selectedOption) => {
                    setGenre(selectedOption);
                }}
                value={genre}
                isMulti
                styles={customStyles}
                options={genreList}
                placeholder={t('select genre')}
            />

            <div className={style.tagsCont + ' my-form mt-3'}>
                <input className='w-100' type="text" value={tagInput} placeholder=''
                       onFocus={tagsInputTouch}
                       onBlur={() => setShowTagList(false)}
                       onChange={tagsListChange}/>
                <label className=''>{t('add tags')}</label>
                {showTagList && tagsList.length > 0 && tags.length + newTagsList.length < 9 &&
                <div className={style.tagslist}>

                    {tagsList.map(a => {
                        return <TagItem key={a.value} value={a} addTag={addTag}/>
                    })}
                    <div
                        onMouseDown={addNewTag}
                        className={style.tagslistitem + ' ' + style.addNewTag}>{t('Add new tag')} "{tagInput}"</div>
                </div>
                }
                {showTagList && tagsList.length === 0 && tags.length + newTagsList.length < 9 &&
                <div className={style.tagslist}>
                    <div
                        onMouseDown={addNewTag}
                        className={style.tagslistitem + ' ' + style.addNewTag}>{t('Add new tag')} "{tagInput}"</div>
                </div>
                }
            </div>
            <div className={style.tagsTarget}>
                {tags.length > 0 && tags.map(a=>{
                    return <DelTag key={a.value}
                        tag={a} delTag={delTag} />
                })}
                {newTagsList.length > 0 && newTagsList.map(a=>{
                    return <DelTag key={a.value}
                                   tag={a} delTag={deleteNewTag} type='new' />
                })}
                {tags.length + newTagsList.length === 9 &&
                <span style={{color:'red'}}>
                    ({t('max 9 tags')})
                </span>
                }
            </div>

            <div className={' my-form mt-3'}>
                <input
                    type="text"
                    pattern="[0-9]*"
                    value={ageLimit}
                    onChange={inputAge}
                    className='w-100 '
                    placeholder=''

                />
                <label className=''>{t('Age limit')}</label>
            </div>

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

            {paid ? (
                    <div className='my-form'>
                        <input className=' w-25' type="number" step='50' value={price} onChange={(e) => {
                            setPrice(e.target.value)
                        }}/>
                    </div>)
                :
                (
                    <div>

                    </div>
                )
            }


            <button onClick={onSubmit} className='my-btn type-5 w-100 mb-5 mt-3   '><span>{t('Add')}</span></button>

        </div>
    );
};

export default AddBook;
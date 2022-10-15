import React from 'react';
import style from "../../pages/Main/Main.module.scss";
import {Link} from "react-router-dom";
import {BOOK_ROUTE, READER_ROUTER} from "../../routing/consts";
import photo from "../../assets/images/unnamed.png";
import {httpOnHttps, nameLengthSlice} from "../../utils/customFunc";
import {useTranslation} from "react-i18next";

const ContinueReadComponent = (props) => {
    const { t } = useTranslation();

    return (
        <>
            {
            props.data.book ? <div className={style.books + ' ' + style.readCont + '  text-center mt-4 ps-0'}>
            <h6  className={ ' p-2'}><i className="fas fa-book" /> {t('Continue reading')}... </h6>
            <Link to={READER_ROUTER+'/'+props.data.book.id+'/'+props.data.id}>
                <img
                    src={props.data.book.cover ? httpOnHttps(props.data.book.cover) : photo}
                    alt="" style={{width: 160}}/>
            </Link>
            <Link to={BOOK_ROUTE+'/'+props.data.book.id}><p className='p1 semibold mt-3 mb-4'>{nameLengthSlice(props.data.book.name,60)}</p></Link>
            <Link to={READER_ROUTER+'/'+props.data.book.id+'/'+props.data.id}><p className='p2 mt-3 mb-4'>{nameLengthSlice(props.data.name,50)}</p></Link>
        </div> : null
            }
        </>
    );
};

export default ContinueReadComponent;
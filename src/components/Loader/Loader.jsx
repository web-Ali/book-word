import React from 'react';
import style from './Loader.module.css';
import loader from '../../assets/images/loader.gif'
const Loader = ({fix = true}) => {
    return (
        <div className={fix ? style.wrapper : null }>
            <img width='100px' src={loader} alt=""/>
        </div>
    );
};

export default Loader;
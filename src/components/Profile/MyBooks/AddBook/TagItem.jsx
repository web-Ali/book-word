import React from 'react';
import style from "./AddBook.module.scss";

const TagItem = ({value,addTag}) => {
    return (
        <div onMouseDown={()=>addTag(value)} className={style.tagslistitem}> {value.label} <br/></div>
    );
};

export default TagItem;
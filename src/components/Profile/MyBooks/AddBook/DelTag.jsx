import React from 'react';

const DelTag = ({delTag, tag, type = ''}) => {
    return (
        <div>{tag.label} <i onClick={()=>delTag(type ==='new' ? tag.label : tag.value)}
               className="fa fa-times" aria-hidden="true" />
        </div>
    );
};

export default DelTag;
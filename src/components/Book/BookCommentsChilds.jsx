import React from 'react';
import BookCommentsChildsItem from "./BookCommentsChildsItem";

const BookCommentsChilds = ({childs,addCom, comId,deleteThisComment,bookId}) => {
    return (
        <div>
            {
                Array.isArray(childs) && childs.map((item) => {
                    return  <BookCommentsChildsItem comId={comId} bookId={bookId} deleteThisComment={deleteThisComment} addCom={addCom} key={item.id} item={item}/>
                })
            }
        </div>
    );
};

export default BookCommentsChilds;
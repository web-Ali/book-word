import React from 'react';
import ProfileCommentsChildsItem from "./ProfileCommentsChildsItem";

const ProfileCommentsChilds = ({childs,addCom, commentId,deleteThisComment,username}) => {
    return (
        <div>
            {
                Array.isArray(childs) && childs.map((item) => {
                    return  <ProfileCommentsChildsItem username={username} deleteThisComment={deleteThisComment} addCom={addCom} commentId={commentId} key={item.id} item={item}/>
                })
            }
        </div>
    );
};

export default ProfileCommentsChilds;
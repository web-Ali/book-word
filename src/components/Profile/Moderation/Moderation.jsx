import React from 'react';
import ModerationItem from "./ModerationItem";

const Moderation = (props) => {
    return (
        <>
            {props.data.map(item => {
                return <ModerationItem key={item.id} chapter={item} verify={props.verify}/>
            })}
        </>
    );
};

export default Moderation;
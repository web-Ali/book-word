import React from 'react';
import BlogContainer from "../../containers/Blog/BlogContainer";

const Blog = (props) => {
    return (
        <div className='container'>
            <BlogContainer id={props.match.params?.id}/>
        </div>
    );
};

export default Blog;
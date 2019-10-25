import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'

const MyPosts = (props) => {
    let textPost= React.createRef();
    let addMessage = () =>{
        props.addPost(textPost.current.value)
        textPost.current.value = '';
    };
        return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea ref={textPost}></textarea>
                </div>
                <div>
                    <button onClick={addMessage}>Add Post</button>
                </div>
            </div>
            <div className={s.posts}>
                {props.posts.map(p => <Post message={p.message}/>)}
            </div>
        </div>
    );
};

export default MyPosts;
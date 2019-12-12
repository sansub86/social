import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'
import {addNewPostActionCreator, updateNewPostActionCreator} from '../../../redux/state'
const MyPosts = (props) => {
    let textPost= React.createRef();
    let addMessage = () =>{
        props.dispatch(addNewPostActionCreator());
    };
    let changeText = () =>{
        let text = textPost.current.value;
        props.dispatch(updateNewPostActionCreator(text));
    };
        return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea ref={textPost} value={props.newPostText} onChange={changeText}></textarea>
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
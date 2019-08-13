import React from 'react';
import s from './MyPosts.module.css';

const MyPosts = () => {
    return (
        <div>
            My Posts
            <div>New post</div>
            <div className={s.posts}>
                <div className={s.item}>Post 1</div>
                <div className={s.item}>Post 2</div>
            </div>
        </div>
    );
};
export default MyPosts;
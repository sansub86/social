import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFkS-2H6DXvajDpXgKXahuEsel17VoH8-CY38_3NqurBV3T8yQcg" alt = "avatar"/>
            {props.message}
            <div>
                <span>like</span>
            </div>
        </div>
    );
};
export default Post;
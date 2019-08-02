import React from 'react';
import s from './Profile.module.css';

const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                <img src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Main image"/>
            </div>
            <div>
                ava + description
            </div>
            <div>
                My Posts
                <div>New post</div>
                <div>
                    <div className={s.item}>Post 1</div>
                    <div className={s.item}>Post 2</div>
                </div>
            </div>
        </div>
    );
};
export default Profile;
import React from 'react';
import s from './Users.module.css'
import photo from '../../assets/default-avatar.png'
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : photo}
                             className={s.usersPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={
                            () => {
                                unfollow(user.id)
                            }
                        }>Unfollow</button> :
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={
                            () => {
                                follow(user.id)
                            }
                        }>Follow</button>}
                </div>
            </div>
            <div>
                <div>
                    <div>{user.name}</div>
                    <div>{user.state}</div>
                </div>
                <div>
                    <div>{"user.location.city"}</div>
                    <div>{"user.location.country"}</div>
                </div>
            </div>
        </div>

    )
};

export default User;
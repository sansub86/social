import React from 'react';
import s from './Users.module.css'
import photo from '../../assets/default-avatar.png'
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";

let Users = (props) => {
    let pages = [];
    let pagesNumber = Math.ceil(props.totalUsersCount/props.pageSize);

    for (let i=1; i <= pagesNumber; i++ ){
        pages.push(i);
    }
    return (
        <>
        {props.isLoading? <Preloader/>:null}
        <div>
            <div>
                {
                    pages.map(p => {
                        return <span className={props.currentPage === p && s.pageSelected} onClick={()=>{props.onPageChange(p)}}> {p} </span>
                    })
                }

            </div>
            {
                props.users.map(u => {
                    return <div key={u.id}>
                        <div>
                            <div>
                                <NavLink to={'/profile/'+u.id}>
                                    <img src={u.photos.small!=null?u.photos.small:photo} className={s.usersPhoto}/>
                                </NavLink>
                            </div>
                            <div>
                                {u.followed? <button onClick={()=>props.unfollow(u.id)}>Unfollow</button>:<button onClick={()=>props.follow(u.id)}>Follow</button>}
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>{u.name}</div>
                                <div>{u.state}</div>
                            </div>
                            <div>
                                <div>{"u.location.city"}</div>
                                <div>{"u.location.country"}</div>
                            </div>
                        </div>
                    </div>;
                })
            }
        </div>
        </>
    );
};


export default Users;
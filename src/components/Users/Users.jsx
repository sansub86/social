import React from 'react';
import s from './Users.module.css'
import photo from '../../assets/default-avatar.png'
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import * as axios from 'axios'

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
                                {u.followed ?
                                    <button disabled={props.followingInProgress.some(id => id ===u.id)} onClick={
                                        ()=>{
                                            props.toggleFollowingProgress(true, u.id);
                                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                                withCredentials: true,
                                                headers : {
                                                    "API-KEY": "6482c7ed-d63e-4a3d-961e-242eacc2c1ec"
                                                }
                                            }).then(response => {
                                                if(response.data.resultCode === 0){
                                                    props.unfollow(u.id);
                                                }
                                                props.toggleFollowingProgress(false, u.id);
                                            });
                                            }
                                    }>Unfollow</button>:
                                    <button disabled={props.followingInProgress.some(id => id ===u.id)} onClick={
                                        ()=>{
                                            props.toggleFollowingProgress(true, u.id);
                                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{} ,{
                                                withCredentials: true,
                                                headers : {
                                                    "API-KEY": "6482c7ed-d63e-4a3d-961e-242eacc2c1ec"
                                                }
                                            }).then(response => {
                                                if(response.data.resultCode === 0){
                                                    props.follow(u.id);
                                                }
                                                props.toggleFollowingProgress(false, u.id);
                                            });
                                        }
                                    }>Follow</button>}
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
import React from 'react';
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = (props) => {
    return (
        <div>
            {props.isLoading ? <Preloader/> : null}
            <div>
                <Paginator totalItemsCount={props.totalUsersCount}
                           pageSize={props.pageSize}
                           currentPage={props.currentPage}
                           onPageChange={props.onPageChange}
                />
                {
                    props.users.map(u => {
                        return <User
                            key={u.id}
                            user={u}
                            followingInProgress={props.followingInProgress}
                            unfollow={props.unfollow}
                            follow={props.follow}
                        />
                    })
                }
            </div>
        </div>
    );
};


export default Users;
import React from 'react';
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type Props = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isLoading: boolean
}

let Users: React.FC<Props> = (props) => {
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
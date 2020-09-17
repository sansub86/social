import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers, follow, unfollow} from "../../redux/users_reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users_selectors";

type Props = {

}

export const Users: React.FC<Props> = (props) => {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const users = useSelector(getUsers);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch();

    const onPageChange = (page: number) => {
        dispatch(requestUsers(page, pageSize, filter));
    };
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    };
    const followUser = (userId: number) => {
        dispatch(follow(userId));
    };
    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId));
    };

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    },[]);

    return (
            <div>
                <UsersSearchForm onFilterChanged = {onFilterChanged}/>
                <Paginator totalItemsCount={totalUsersCount}
                           pageSize={pageSize}
                           currentPage={currentPage}
                           onPageChange={onPageChange}
                />
                {
                    users.map(u => {
                        return <User
                            key={u.id}
                            user={u}
                            followingInProgress={followingInProgress}
                            unfollow={unfollowUser}
                            follow={followUser}
                        />
                    })
                }
            </div>
    );
};

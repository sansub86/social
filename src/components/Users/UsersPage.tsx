import React from 'react';
import {useSelector} from "react-redux";
import {getIsLoading} from "../../redux/users_selectors";
import Preloader from "../common/Preloader/Preloader";
import {Users} from "./Users";

type Props = {
    pageTitle: string
}
const UsersPage: React.FC<Props> = (props) => {
    const isLoading = useSelector(getIsLoading);
    return <div>
        <h2>{props.pageTitle}</h2>
        {isLoading ? <Preloader/> : null}
        <Users/>
    </div>
}
export default UsersPage;
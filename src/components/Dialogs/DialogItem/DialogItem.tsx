/**
 * Created by User-35 on 07.08.2019.
 */
import React from 'react'
import s from './DialogItem.module.css'
import {NavLink} from "react-router-dom";
type PropsType = {
    id: number
    name: string
}
const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    );
};
export default DialogItem;
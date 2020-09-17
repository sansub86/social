import React from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../../common/FormsControls/FormsControl";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from '../ProfileInfo.module.css';
import style from "../../../common/FormsControls/FormsControl.module.css";
import {ProfileType} from "../../../../types/types";

type PropsType ={
    profile: ProfileType
}
type  ProfileTypeKeys = GetStringKeys<ProfileType>
const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            {error && <div className={style.summaryError}>
                {error}
            </div>}
            <div>
                <b>Full name: </b> {createField<ProfileTypeKeys>(Input, "fullName", "Full name", [])}
            </div>
            <div>
                <b>Looking for a job: </b> {createField<ProfileTypeKeys>(Input, "lookingForAJob", "", [], {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills: </b>:
                {createField<ProfileTypeKeys>(Textarea,"lookingForAJobDescription","My professional skills",[])}
            </div>
            <div>
                <b>About me: </b>
                {createField<ProfileTypeKeys>(Textarea,"aboutMe","About me",[])}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key = {key} className={s.contact}>
                    <b>{key}:</b>{createField(Input, "contacts." + key, key, [])}
                </div>
            })}
            </div>
        </form>
    );
};
const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm);
export default ProfileDataFormRedux;
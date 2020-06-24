import React from "react";
import {createField, Input, Textarea} from "../../../common/FormsControls/FormsControl";
import {reduxForm} from "redux-form";
import s from '../ProfileInfo.module.css';
import style from "../../../common/FormsControls/FormsControl.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            {error && <div className={style.summaryError}>
                {error}
            </div>}
            <div>
                <b>Full name: </b> {createField(Input, "fullName", "Full name", [])}
            </div>
            <div>
                <b>Looking for a job: </b> {createField(Input, "lookingForAJob", "", [], {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills: </b>:
                {createField(Textarea,"lookingForAJobDescription","My professional skills",[])}
            </div>
            <div>
                <b>About me: </b>
                {createField(Textarea,"aboutMe","About me",[])}
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
const ProfileDataFormRedux = reduxForm({form: 'edit-profile'})(ProfileDataForm);
export default ProfileDataFormRedux;
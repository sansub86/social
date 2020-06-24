import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import avatar from "../../../assets/default-avatar.png"
import ProfileDataFormRedux from "./ProfileDataForm/ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);
    if (!profile) {
        return <Preloader/>
    }
    const changeMainAvatar = (e) => {
        if (e.target.files.length) {
            let file = e.target.files[0];
            savePhoto(file);
        }

    };
    const onSubmit = (formData) => {
        saveProfile(formData).then(()=>{
            setEditMode(false);
        });
    };
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img className={s.mainAvatar} src={profile.photos.large || avatar} alt="SomethingPicture"/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {isOwner && <input type="file" onChange={changeMainAvatar}/>}
                {editMode ? <ProfileDataFormRedux initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
                    <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>}
            </div>
        </div>
    );
};
export default ProfileInfo;

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}:</b>{contactValue}</div>
};
const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>Edit</button>
        </div>}
        <div>
            <b>Full name: </b>{profile.fullName}
        </div>
        <div>
            <b>Looking for a job: </b> {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills: </b>: {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me: </b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
};
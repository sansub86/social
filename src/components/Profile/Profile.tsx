import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo, {PropsType} from './ProfileInfo/ProfileInfo';

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    );
};
export default Profile;
import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostType>

}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    let addMessage = (formData: AddPostFormValuesType) => {
        props.addPost(formData.addNewPostText);
    };
    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <AddPostForm onSubmit={addMessage}/>
            </div>
            <div className={s.posts}>
                {props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)}
            </div>
        </div>
    );
};
const MyPostsMemorized = React.memo(MyPosts);
export default MyPostsMemorized;
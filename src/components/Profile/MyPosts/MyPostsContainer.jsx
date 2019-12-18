import React from 'react';
import {addNewPostActionCreator, updateNewPostActionCreator} from '../../../redux/profile_reducer'
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {

    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addNewPostActionCreator());
    };
    let changeText = (text) => {
        props.store.dispatch(updateNewPostActionCreator(text));
    };
        return <MyPosts updateNewPostText={changeText} addPost = {addPost} posts = {state.profilePage.posts} newPostText = {state.profilePage.newPostText}/>;
};

export default MyPostsContainer;
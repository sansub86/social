import React from 'react';
import {addNewPostActionCreator, updateNewPostActionCreator} from '../../../redux/profile_reducer'
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

/*const MyPostsContainer = (props) => {

    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addNewPostActionCreator());
    };
    let changeText = (text) => {
        props.store.dispatch(updateNewPostActionCreator(text));
    };
        return <MyPosts updateNewPostText={changeText} addPost = {addPost} posts = {state.profilePage.posts} newPostText = {state.profilePage.newPostText}/>;
};*/

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addNewPostActionCreator())
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostActionCreator(text))
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
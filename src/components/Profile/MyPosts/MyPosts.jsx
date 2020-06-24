import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControl";

const MyPosts = (props) => {
    let addMessage = (formData) =>{
        props.addPost(formData.addNewPostText);
    };
    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <AddNewPostRedux onSubmit={addMessage}/>
            </div>
            <div className={s.posts}>
                {props.posts.map(p => <Post key={p.id} message={p.message}/>)}
            </div>
        </div>
    );
};
const maxLenght10 = maxLengthCreator(10);
const AddNewPost = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name="addNewPostText"
                    placeholder="New PostText"
                    validate = {[required, maxLenght10]}
                />
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
};
const AddNewPostRedux = reduxForm({form: "addNewPostText"})(AddNewPost);
export default MyPosts;
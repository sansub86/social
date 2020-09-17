import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../../common/FormsControls/FormsControl";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import React from "react";
const maxLenght10 = maxLengthCreator(10);
type PropsType = {

}
export type AddPostFormValuesType = {
    addNewPostText: string
}

type AddMessageFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>
const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType , PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddMessageFormValuesTypeKeys>(Textarea,'addNewPostText','New PostText', [required, maxLenght10])}
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
};
export default reduxForm<AddPostFormValuesType>({form: "addNewPostText"})(AddPostForm);
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControl";
import React from "react";
import {Field, reduxForm} from "redux-form";

const maxLength20 = maxLengthCreator(20);
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLength20]} name="addNewMessageText" placeholder="newMessageText"/>
            </div>
            <div>
                <button>Отправить</button>
            </div>
        </form>
    )
}
export const AddMessageFormRedux = reduxForm({form:"addNewMessageTextForm"})(AddMessageForm);

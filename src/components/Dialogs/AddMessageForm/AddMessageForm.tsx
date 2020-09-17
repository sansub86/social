import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, Textarea} from "../../common/FormsControls/FormsControl";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {AddMessageFormValuesType} from "../Dialogs";

type AddMessageFormValuesKeysType = Extract<keyof AddMessageFormValuesType, string>

const maxLength20 = maxLengthCreator(20);
type PropsType = {}
const AddMessageForm:React.FC<InjectedFormProps<AddMessageFormValuesType,PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddMessageFormValuesKeysType>(Textarea, 'newMessageText', 'Enter your message', [required, maxLength20])}
            </div>
            <div>
                <button>Отправить</button>
            </div>
        </form>
    )
};
export default reduxForm<AddMessageFormValuesType>({form: "addNewMessageTextForm"})(AddMessageForm);
import React from 'react';
import styles from './FormsControl.module.css'
import {Field, WrappedFieldProps, WrappedFieldMetaProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};
export function createField<FormKeysType extends string>(
    component: React.FC<WrappedFieldProps>,
    name: FormKeysType,
    placeholder: string | undefined,
    validators: Array<FieldValidatorType>,
    props = {},
    text = ""){
    return <div>
        <Field
            component={component}
            name={name}
            placeholder={placeholder}
            validate={validators}
            {...props}
        />{text}
    </div>
};
export type GetStringKeys<T> = Extract<keyof T, string>
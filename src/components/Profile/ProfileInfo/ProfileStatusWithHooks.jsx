import React, {useState, useEffect} from 'react';


const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    const activateEditMode = () => {
        setEditMode(true)
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };
    const onChangeStatus = (e) => {
        setStatus(e.currentTarget.value)
    };
    useEffect(()=>{
        setStatus(props.status)
    },[props.status]);
    return <div>
        {!editMode && <div>
            <span onDoubleClick={activateEditMode}>{props.status || "No status"}</span>
        </div>}
        {editMode &&
        <div>
            <input autoFocus={true} onBlur={deactivateEditMode} onChange={onChangeStatus} value={status}/>
        </div>
        }
    </div>

};

export default ProfileStatusWithHooks;
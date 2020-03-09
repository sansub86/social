import React from 'react';


class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    render(){
        return <div>
            <div>
                <span>{this.props.status}</span>
            </div>
            <div>
                <input value={}/>
            </div>
        </div>

    }
}
export default ProfileStatus;
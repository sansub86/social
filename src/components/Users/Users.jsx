import React from 'react';
import s from './Users.module.css'
import photo from '../../default-avatar.png'
import * as axios from 'axios'
/*let Users = (props) => {
    return(
        <div>
            {
                props.users.map(u => {
                    return <div key={u.id}>
                        <div>
                                                    \'<div>
                                <img src={u.photoPath} className={s.usersPhoto}/>
                            </div>
                            <div>
                                {u.followed? <button onClick={()=>props.unfollow(u.id)}>Unfollow</button>:<button onClick={()=>props.follow(u.id)}>Follow</button>}
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>{u.name}</div>
                                <div>{u.state}</div>
                            </div>
                            <div>
                                <div>{u.location.city}</div>
                                <div>{u.location.country}</div>
                            </div>
                        </div>
                    </div>;
                })
            }
        </div>
    );
};*/
class Users extends React.Component {
    constructor (props) {
        super(props);
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items)
        });

    }
    render() {
        return(
            <div>
                {
                    this.props.users.map(u => {
                        return <div key={u.id}>
                            <div>
                                <div>
                                    <img src={u.photos.small!=null?u.photos.small:photo} className={s.usersPhoto}/>
                                </div>
                                <div>
                                    {u.followed? <button onClick={()=>this.props.unfollow(u.id)}>Unfollow</button>:<button onClick={()=>this.props.follow(u.id)}>Follow</button>}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>{u.name}</div>
                                    <div>{u.state}</div>
                                </div>
                                <div>
                                    <div>{"u.location.city"}</div>
                                    <div>{"u.location.country"}</div>
                                </div>
                            </div>
                        </div>;
                    })
                }
            </div>
        );
    }
}
export default Users;
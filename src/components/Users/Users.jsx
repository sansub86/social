import React from 'react';
import s from './Users.module.css'
import photo from '../../default-avatar.png'
import * as axios from 'axios'

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        });
    }
    onPageChange = (page) => {
        this.props.setCurrentPage(page);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        });
    };
    render() {
        let pages = [];
        let pagesNumber = Math.ceil(this.props.totalUsersCount/this.props.pageSize);

        for (let i=1; i <= pagesNumber; i++ ){
            pages.push(i);
        }

        return(
            <div>
                <div>
                    {
                        pages.map(p => {
                            return <span className={this.props.currentPage === p && s.pageSelected} onClick={()=>{this.onPageChange(p)}}> {p} </span>
                        })
                    }

                </div>
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
/**
 * Created by User-35 on 27.02.2020.
 */
import * as axios from 'axios'


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers : {
        "API-KEY": "6482c7ed-d63e-4a3d-961e-242eacc2c1ec"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10){
        return  instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    follow(userId){
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`);
    },
    unfollow(userId){
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`);
    }
};

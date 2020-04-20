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
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`);
    },
};
export const authAPI = {
    me(){
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe){
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instance.delete(`auth/login`);
    }
};
export const profileAPI = {
    getProfile(userId){
       return instance.get(`profile/${userId}`);
    },
    getStatus(userId){
       return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status){
       return instance.put(`profile/status`,{status})
    }
};
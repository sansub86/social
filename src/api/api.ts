/**
 * Created by User-35 on 27.02.2020.
 */
import axios from 'axios'
import {ProfileType} from "../types/types";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "6482c7ed-d63e-4a3d-961e-242eacc2c1ec"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`);
    },
};

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {

    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
};
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
};
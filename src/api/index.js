import axios from "axios";
import cookie from 'cookies-js'

//登录
export const login = (data) => {
    return axios.post(`login/` ,data);
};
import axios from "axios";
import cookie from 'cookies-js'

//获取业务接单
export const getBusinessReceive = (page,prepage) => {
    return axios.get(`api/classes/?page=0&prepage=10&filter=` );
};

//获取业务验收
export const getBusinessCheck = (page,prepage) => {
    return axios.get(`api/inquiry/?page=0&prepage=10&filter=` );
};
import axios from "axios";
import cookie from 'cookies-js'

//获取公共维修统计、获取维修完成情况统计
export const getBusinessReceive = (page,prepage) => {
    return axios.get(`api/classes/?page=0&prepage=10` );
};

//获取业主家收费统计
export const getProprietorsVote = (page,prepage) => {
    return axios.get(`api/inquiry/?page=0&prepage=10` );
};


import axios from "axios";
import cookie from 'cookies-js'

//获取大项维修意见征询
export const getBusinessReceive = (page,prepage) => {
    return axios.get(`api/vote/?page=${page}&prepage=${prepage}&filter=W10=` );
};

//添加维修意见
export const addInquiry = (data) => {
    return axios.post(`api/vote/` );
};

//获取业主投票
export const getProprietorsVote = (page,prepage) => {
    return axios.get(`api/ownervote/?page=${page}&prepage=${prepage}&filter=W10=` );
};

//添加业主投票
export const addVote = (data) => {
    return axios.post(`api/ownervote/` );
};
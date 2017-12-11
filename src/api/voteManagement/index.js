import axios from "axios";
import cookie from 'cookies-js'

//获取大项维修意见征询
export const getBusinessReceive = (page,prepage) => {
    return axios.get(`api/vote/?page=${page}&prepage=${prepage}&filter=W10=` );
};

//添加大项维修意见征询
export const addBusinessReceive = (data) => {
    return axios.post(`/api/vote/`,data);
};

//删除大项维修意见征询
export const removeBusinessReceive = (id) => {
    return axios.delete(`/api/vote/${id}`);
};

//修改大项维修意见征询
export const updateBusinessReceive = (id,data) => {
    return axios.put(`/api/vote/${id}`,data);
};



//获取业主投票
export const getProprietorsVote = (page,prepage) => {
    return axios.get(`api/ownervote/?page=${page}&prepage=${prepage}&filter=W10=` );
};

//添加业主投票
export const addProprietorsVote = (data) => {
    return axios.post(`/api/ownervote/`,data);
};

//删除业主投票
export const removeProprietorsVote = (id) => {
    return axios.delete(`/api/ownervote/${id}`);
};

//修改业主投票
export const updateProprietorsVote = (id,data) => {
    return axios.put(`/api/ownervote/${id}`,data);
};



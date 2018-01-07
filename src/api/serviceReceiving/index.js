import axios from "axios";
import cookie from 'cookies-js'

//获取业务接单
export const getBusinessReceive = (page,prepage) => {
    return axios.get(`api/classes/?pageNum=${page}&pageSize=${prepage}` );
};

//添加业务接单
export const addBusinessReceive = (data) => {
    return axios.post(`/api/classes/`,data);
};

//删除业务接单
export const removeBusinessReceive = (id) => {
    return axios.delete(`/api/classes/${id}`);
};

//修改业务接单
export const updateBusinessReceive = (id,data) => {
    return axios.put(`/api/classes/${id}`,data);
};







//业务验收分页 信息
export const getBusinessCheck = (page,prepage) => {
    return axios.get(`api/inquiry/?page=${page}&prepage=${prepage}` );
};

//添加业务验收
export const addBusinessCheck = (data) => {
    return axios.post(`/api/inquiry/`,data);
};

//删除业务验收
export const removeBusinessCheck = (id) => {
    return axios.delete(`/api/inquiry/${id}`);
};

//修改业务验收
export const updateBusinessCheck = (id,data) => {
    return axios.put(`/api/inquiry/${id}`,data);
};
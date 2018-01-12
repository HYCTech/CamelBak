import axios from "axios";
import cookie from 'cookies-js'



//获取业主分页 信息
export const getProprietorsInfo = (page,prepage) => {
    return axios.get(`api/owner/?pageNum=${page}&pageSize=${prepage}` );
};

//添加业主信息
export const addProprietorsInfo = (data) => {
    return axios.post(`/api/owner/`,data);
};

//删除业主信息
export const removeProprietorsInfo = (id) => {
    return axios.delete(`/api/owner/${id}`);
};

//修改业主信息
export const updateProprietorsInfo = (id,data) => {
    return axios.put(`/api/owner/${id}`,data);
};

//获取物业人员分页信息
export const getPropertyOfcInfo = (page,prepage,filter) => {
    return axios.get(`api/employee/?pageNum=${page}&pageSize=${prepage}&`);
};

//添加物业人员
export const addPropertyOfcInfo = (data) => {
    return axios.post(`/api/employee/`,data);
};

//删除物业人员
export const removePropertyOfcInfo = (id) => {
    return axios.delete(`/api/employee/${id}`);
};

//修改物业人员
export const updatePropertyOfcInfo = (id,data) => {
    return axios.put(`/api/employee/${id}`,data);
};

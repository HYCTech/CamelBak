//维修管理里模块的所有接口

import axios from "axios";
import cookie from 'cookies-js'

//发送报价  http://api.yx101.cn/wxpostmsg



//获取个人维修数据(分页)
export const getRepairInfo = (page,prepage) => {
    return axios.get(`api/service/?pageNum=${page}&pageSize=${prepage}` );
};

//添加维修数据
export const addRepair = (data) => {
    return axios.post(`/api/service/`,data);
};

//删除维修数据
export const removeRepair = (id) => {
    return axios.delete(`/api/service/${id}`);
};

//修改维修数据
export const updateRepair = (id,data) => {
    return axios.put(`/api/service/${id}`,data);
};




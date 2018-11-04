//维修管理里模块的所有接口

import axios from "axios";
import cookie from 'cookies-js'

//发送报价  http://api.yx101.cn/wxpostmsg


//获取维修单
export const getOrder = (page,prepage,filter) => {
    return axios.get(`api/order/?pageNum=${page}&pageSize=${prepage}&filter=${JSON.stringify(filter)}` );
}

//添加维修单
export const addOrder = (params) => {
    return axios.post(`api/order`,params);
}

//修改维修单
export const updateOrder = (id,params) => {
    return axios.put(`api/order/${id}`,params);
}

//修改维修单
export const delOrder = (id) => {
    return axios.delete(`api/order/${id}`);
}

//生成订单
export const createOrderId = (params) => {
    return axios.post(`api/order?order=1`,params)
}

//发送报价
export const sendPrices = (params) => {
    return axios.post(`/send/price`,params)
}

//获表记录总数
export const getCountByTableName = (tableName,filter) => {
    return axios.get(`count/${tableName}?filter=${JSON.stringify(filter)}`)
}

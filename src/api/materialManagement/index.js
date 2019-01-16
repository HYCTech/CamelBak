import axios from "axios";
import cookie from 'cookies-js'


//获取材料列表 信息
export const getMaterialInfo = (page,prepage,filter) => {
    return axios.get(`api/material/?pageNum=${page}&pageSize=${prepage}&filter=${JSON.stringify(filter)}` );
};

//添加材料信息
export const addMaterialInfo = (data) => {
    return axios.post(`/api/material/`,data);
};

//删除材料信息
export const removeMaterialInfo = (id) => {
    return axios.delete(`/api/material/${id}`);
};

//修改材料信息
export const updateMaterialInfo = (id,data) => {
    return axios.put(`/api/material/${id}`,data);
};

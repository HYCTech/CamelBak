import axios from "axios";
import cookie from 'cookies-js'

//维修管理里模块的所有接口
export const getBusinessReceive = (page,prepage) => {
    return axios.get(`api/service/?page=${page}&prepage=${prepage}&filter=W10=` );
};


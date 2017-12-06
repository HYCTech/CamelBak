import axios from "axios";
import cookie from 'cookies-js'



//获取业主分页 信息
export const getProprietorsInfo = (page,prepage) => {
    return axios.get(`api/owner/?page=${page}&prepage=${prepage}&filter=W10=` );
};

//获取物业人员分页信息
export const getPropertyOfcInfo = (page,prepage) => {
    return axios.get(`api/employee/?page=${page}&prepage=${prepage}&filter=W10=`);
};


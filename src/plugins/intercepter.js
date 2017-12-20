import axios from 'axios'
import _ from 'lodash'
import store from '@/store'
import config from '@/config'
import router from '../router'
import { Loading ,Message} from 'element-ui';



const requests = []

export default (Vue) => {
    Object.defineProperties(Vue.prototype, {
            $http: {
                value: axios
            }
        })
        //axios配置
    axios.defaults.baseURL = config[process.env.NODE_ENV].host
    axios.defaults.timeout = 50000
        // 添加拦截器
    axios.interceptors.request.use(function(config) {
      
        requests.push(config)
         store.dispatch('setLoading', true)
        return config
    }, function(error) {
        this.$message({
            showClose: true,
            message: '系统出错了哦',
            type: 'error'
          });
        return Promise.reject(error)
    })





    axios.interceptors.response.use(function(response) {  
        _.remove(requests, r => {
            return r === response.config
        }) 
        if (!requests.length) {
            setTimeout(() => {
                 store.dispatch('setLoading', false)
            }, 300)
        }

        return response.data
    }, function(error) {
        store.dispatch('setLoading', false)
        this.$message({
            showClose: true,
            message: '系统出错了哦',
            type: 'error'
          });

        if (error.response) {
            
            console.log(error.response.status)
            switch (error.response.status) {
                case 401:
                    console.log("401 未授权");
                    break;
                case 500:
                    console.log('500');
                    break;
                 
                default:
                    console.log("发生错误了");
            }

        } else {
            console.log('超时')
        }
       
        return Promise.reject(error)

    })
}
import axios from 'axios'
import _ from 'lodash'
import store from '@/store'
import config from '@/config'
import router from '../router'
import { Loading ,Message} from 'element-ui';


//let loadingInstance = Loading.service({ fullscreen: true });
let loadingInstance = null;
//loadingInstance.close();
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
        loadingInstance = Loading.service({ fullscreen: true });
       
       // console.log(`${config.url}--begin`)
        requests.push(config)
        return config
    }, function(error) {
        this.$message({
            showClose: true,
            message: '系统出错了哦',
            type: 'error'
          });
        loadingInstance.close();
        return Promise.reject(error)
    })





    axios.interceptors.response.use(function(response) {
        loadingInstance.close();
      
        //console.log(`${response.config.url}--end`)
        _.remove(requests, r => {
            return r === response.config
        }) 
        return response.data
    }, function(error) {
    
        this.$message({
            showClose: true,
            message: '系统出错了哦',
            type: 'error'
          });

        loadingInstance.close();
        if (error.response) {
            
            console.log(error.response.status)
            switch (error.response.status) {
                case 401:

                    console.log("401 未授权");
                    break;
                case 500:
                    console.log('账号密码出错');
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
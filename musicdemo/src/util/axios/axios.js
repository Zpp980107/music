import axios from 'axios'

let http = axios.create({
    // baseURL:'/api'
})

//请求拦截
http.interceptors.request.use(req=>{
    // //添加token请求头
    // let userInfo= sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) :{}
    // req.headers.authorization = userInfo.token
    //设置请求，根据需求
    return req
})

//登录拦截
http.interceptors.response.use(res=>{
    //大量的全局错误拦截
    //针对于返回信息进行拦截
    return res.data
})

//导出
export default http


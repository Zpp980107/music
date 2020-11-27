//引入封装好的axios库
import http from './axios'

//封装接口
//封装推荐歌单接口
export function recMusic(params) {
    return http.get('/personalized', {
        params
    })
}

//封装推荐新音乐接口
export function newSong() {
    return http.get('/personalized/newsong')
}
//封装热歌榜音乐接口
export function hotSong(params){
    return http.get('/playlist/detail',{
        params
    })
}

//封装热门搜索的音乐接口
export function searchList() {
    return http.get('/search/hot')
}
//封装音乐搜索 的接口
export function search(params) {
    return http.get('/search', {
        params
    })
}

//封装轮播的接口
export function banner(){
    return http.get('/banner')
}
//封装最佳匹配的接口
export function searchmultimatch(params){
    return http.get('/search/multimatch',{
        params
    })
}
//封装歌单详情
export function playDetail(params){
    return http.get('/playlist/detail',{
        params
    })
}

//获取歌曲详情
export function songDetail(params){
    return http.get('/song/detail',{
        params
    })
}

//获取音乐URL
export function playUrl(params){
    return http.get('/song/url',{
        params
    })
}

//获取歌词
export function getLyric(params){
    return http.get('/lyric',{
        params
    })
}
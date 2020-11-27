import React from "react";
//querystring 模块提供用于解析和格式化 URL 查询字符串的实用工具
import qsString from 'querystring'

import { playDetail } from "../util/axios/index";
import play from '../assets/images/play.png'
import tubiao from '../assets/images/erji.svg'
import aa from '../assets/images/tubiao.png'

// 引入css
import "../assets/css/list.css";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      playList: {},
      songList: [],
      play,
      tubiao,
      aa
    };
  }
  goPlay(id) {
    this.props.history.push(`/play?id=${id}`);
  }
  //挂载
  componentDidMount() {
    let query = this.props.location.search.slice(1);
    console.log(query, "路由属性");
    //组件一加载调取歌单详情接口
    playDetail({
      id: qsString.parse(query).id,
    }).then((res) => {
      console.log(res, "歌单详情");
      if (res.code == 200) {
        this.setState({
          playList: res.playlist,
          songList: res.playlist.tracks,

        });
      }
    });
  }
  render() {
    const { playList, songList, play, tubiao,aa } = this.state;
    return (
      <div className='list'>
        <div className="header">
          <img className='img' src={playList.coverImgUrl} alt="" />
          <img className='touImg' src={playList.coverImgUrl} alt="" />
          <div className='ico'>歌单</div>
          <div className='text'>{playList.name}</div>
          <div className='creator'>
            <div>
              <img src={playList.creator ? playList.creator.avatarUrl : ''}></img>
            </div>
            <span>{playList.creator ? playList.creator.nickname : ''}</span>
          </div>
          <div className='tubiao'>
            <img className='erji' src={tubiao} alt="" />
            {(playList.playCount / 10000).toFixed(1)}万
        </div>
        </div>
        <div className='songlist'>
          <div className='title'>歌曲列表</div>
          <ul className='list1'>
            {songList.map((item, index) => {
              return (
                <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                  <div className='order'>{index + 1}</div>
                  <div className='listname'>{item.name}</div>
                  <i></i>
                  <span className='singer1'>{
                    item.ar.map((song, index) => {
                      if (index == item.ar.length - 1) {
                        return (
                          <span className='singer ' key={song.id}>{song.name} - {item.name}</span>
                        )
                      } else {
                        return <span className='singer' key={song.id}>{song.name}/</span>
                      }
                    })
                  }</span>
                  <img className="playImg" src={play} alt="" />
                </li>
              )
            })}
          </ul>
        </div>
        <div className="store">
          <img src={aa} alt=""/>
          <span>收藏歌单</span>
        </div>
      </div>
    );
  }
}
export default Home;

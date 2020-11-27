import React from "react";
//引入路由属性
import { NavLink } from "react-router-dom";
//引入样式
import "../../assets/css/home.css";
//引入接口
import { recMusic, newSong, banner } from '../../util/axios'
import axios from 'axios'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
/*
 引入静态资源的方法 
 一、通过import 方式引入
 import imgUrl from '../../assets/images/1.jpg'
 应用： <img src= {imgUrl} alt=""/>
 */
//引入静态资源图片
import play from "../../assets/images/play.png";
import footer from "../../assets/images/footer.png";
import jinglingtu from '../../assets/images/jinglingtu.png'
import erji from '../../assets/images/erji.svg'
import Axios from "axios";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      songList: [],
      newSongList: [],
      footerImg: footer,
      jinglingtu,
      img: play,
      erji,
      bannerList: []
    };
  }
  //挂载
  componentDidMount() {
    //并发处理
    axios.all([recMusic({ limit: 6 }), newSong()]).then(
      axios.spread((res2, res1) => {
        if (res1.code == 200) {
          this.setState({
            newSongList: res1.result
          })
        }
        if (res2.code == 200) {
          this.setState({
            songList: res2.result
          })
        }
      })
    )
    banner().then(res => {
      if (res.code == 200) {
        this.setState({
          bannerList: res.banners
        }, () => {
          new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
              delay: 2000
            },
            pagination: {               
              el: ".swiper-pagination",
            },
          })
        })
      }
    })
    // //推荐歌单
    // recMusic({
    //   limit: 6
    // })
    //   .then(res => {
    //     console.log(res, '推荐歌单');
    //     if (res.code == 200) {
    //       this.setState({
    //         songList: res.result
    //       })
    //     }
    //   })
    // // 推荐新音乐
    // newSong()
    //   .then(res => {
    //     console.log(res, '新音乐列表')
    //     if (res.code == 200) {
    //       this.setState({
    //         newSongList: res.result
    //       })
    //     }
    //   })
  }
  //封装一个跳转函数
  goList(id) {
    this.props.history.push(`/list?id=${id}`);
    // this.props.history.replace(`/list?id=${id}`)
    console.log(this, "home子类");
  }
  goPlay(id) {
    this.props.history.push(`/play?id=${id}`);
  }
  render() {
    const { songList, newSongList, footerImg, img, erji, bannerList } = this.state;
    return (
      <div className="home">
        <div className="swiper-container">
          <div className="swiper-wrapper" >
            {bannerList.map(item => {
              return (
                <div className="swiper-slide" key={item.imageUrl}>
                  <img src={item.imageUrl} alt="" />
                </ div>
              )
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className='header'>推荐歌单</div>
        <ul>
          {songList.map((item) => {
            return (
              <li key={item.id} onClick={this.goList.bind(this, item.id)}>
                {/* 动态跳转之传递query */}
                {/* <NavLink to={'/list?id='+item.id+'&name=呵呵'}>
                  <img className="img" src={item.img} alt="" />
                  <p>{item.name}</p>
                </NavLink> */}
                <img className="img" src={item.picUrl} alt="" />
                <div className='playCount'>
                  <img src={erji} alt="" />
                  {(item.playCount / 10000).toFixed(1)}万
                </div>
                <p>{item.name}</p>
              </li>
            );
          })}
        </ul>
        <div className='header'>最新音乐</div>
        <ul className='list'>
          {newSongList.map((item) => {
            return (
              <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                <div className='listname'>{item.name}</div>
                <i></i>
                <span id='span'>{
                  item.song.artists.map((song, index) => {
                    if (index == item.song.artists.length - 1) {
                      return (
                        <span className='singer' key={song.id}>{song.name} - {item.name}</span>
                      )
                    } else {
                      return <span className='singer' key={song.id}>{song.name}/</span>
                    }
                  })
                }
                </span>
                <img className="playImg" src={img} alt="" />
              </li>
            );
          })}
        </ul>
        <img className="footerImg" src={footerImg} alt="" />
      </div>
    );
  }
}
export default Home;

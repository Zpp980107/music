import React from 'react'
//引入css样式
import '../../assets/css/rank.css'

//引入热歌榜的接口
import { hotSong } from '../../util/axios/index'
//引入静态资源路径
import jinglingtu from '../../assets/images/jinglingtu.png'
import hotBg from '../../assets/images/hotbg.jpg'
import play from "../../assets/images/play.png";
class Rank extends React.Component {
    constructor() {
        super();
        this.state = {
            hotBg,
            jinglingtu,
            newSongList: [],
            play,
            time:0
        }
    }
    goPlay(id) {
        this.props.history.push(`/play?id=${id}`);
    }
    getTime(time) {
        let date = new Date(time);
        //获取年份
        let year = date.getFullYear();
        //获取月份
        let month = ((date.getMonth() + 1) + '').padStart(2, '0')
        //获取天数
        let day = (date.getDate() + '').padStart(2, '0')
        let hour = (date.getHours() + '').padStart(2, '0')
        let minute = (date.getMinutes() + '').padStart(2, '0')
        let second = (date.getSeconds() + '').padStart(2, '0')
        return `${month}月${day}日`
    };
    //挂载
    componentDidMount() {
        //热门搜索
        hotSong({
            id: 3778678,
        })
            .then(res => {
                if (res.code == 200) {
                    console.log(res);
                    this.setState({
                        newSongList: res.playlist.tracks.slice(0, 20),
                        time:res.playlist.updateTime
                    })
                }
            })
        
    }
    render() {
        const { hotBg, jinglingtu, newSongList, play,time } = this.state;
        return (<div className='hot'>
            <div className='bg'>
                <img className="hotbg" src={hotBg} alt="" />
                <div className='jlt'></div>
                <p>更新于{this.getTime(time)}</p>
            </div>
            <ul className='list'>
                {newSongList.map((item, index) => {
                    return (
                        <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                            <div className='order'>{(index + 1) < 10 ? '0' + (index + 1) : (index + 1)}</div>
                            <div className='listname'>{item.name}</div>
                            <i></i>
                            <div>
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
                            </div>

                            <img className="playImg" src={play} alt="" />
                        </li>
                    );
                })}
            </ul>
            <div className='footer'>查看完整歌单&gt;</div>
        </div>)
    }
}
export default Rank
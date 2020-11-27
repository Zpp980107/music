import React, { Component } from 'react'
//引入样式
//引入封装好的接口
import { searchList, search, searchmultimatch } from '../../util/axios'
import play from '../../assets/images/play.png'
import "../../assets/css/search.css";
import axios from 'axios'
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            searchList: [],
            value: '',
            newSearchList: [],
            play,
            BestMatch: '',
            BestMatchname: ''
        }
    }
    enter(e) {
        this.setState({
            value: e.target.value
        })
    }
    delete() {
        this.setState({
            value: '',
            newSearchList:[]
        })
    }
    getValue(id) {
        this.setState({
            value: id
        })
        if(id==''){
            return ;
        }
        search({
            keywords: id,
            limit: 10
        }).then(res => {
            if (res.code == 200) {
                this.setState({
                    newSearchList: res.result.songs
                })
            }
        })
    }
    goPlay(id) {
        this.props.history.push(`/play?id=${id}`);
    }
    sear(e) {
        if (e.keyCode == 13) {
            if(e.target.value==''){
                return ;
            }
            //并发处理
            axios.all([search({
                keywords: e.target.value,
                limit: 10
            }), searchmultimatch({
                keywords: e.target.value
            })]).then(
                axios.spread((res1, res2) => {
                    if (res1.code == 200) {
                        this.setState({
                            newSearchList: res1.result.songs
                        })
                    }
                    if (res2.code == 200) {   
                        console.log(res2);
                        this.setState({
                            BestMatch: res2.result.artist,
                        })
                    }
                })
            )
            // //调取搜索的接口
            // search({
            //     keywords: e.target.value,
            //     limit: 10
            // }).then(res => {
            //     if (res.code == 200) {
            //         this.setState({
            //             newSearchList: res.result.songs
            //         })
            //     }
            // })
            // // searchmultimatch({
            // //     keywords:e.target.value
            // // }).then(res=>{
            // //     if(res.code==200){
            // //         console.log(res);
            // //     }
            // // })
        }
    }
    //挂载
    componentDidMount() {
        //热门搜索
        searchList()
            .then(res => {
                if (res.code == 200) {
                    this.setState({
                        searchList: res.result.hots
                    })
                }
            })
    }
    render() {
        const { searchList, value, newSearchList, play, BestMatch, BestMatchname } = this.state;
        return (<div className='search'>
            <div className='search-input'>
                <input type="text" placeholder=' 搜索歌曲、歌手、专辑' onChange={this.enter.bind(this)} onKeyUp={this.sear.bind(this)} value={value} />
                <div className='searchImg'></div>
                <div className={value != '' ? 'delete' : ''} onClick={this.delete.bind(this)}></div>
            </div>
            <div className={value != '' ? 'hotsearch' : ''}>
                <div className={value != '' ? 'header  a' : 'a'}>热门搜索</div>
                <ul className='hotsList'>
                    {searchList.map((item) => {
                        return (
                            <li key={item.first} onClick={this.getValue.bind(this, item.first)}>
                                <div className='hots'>{item.first}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={value != '' ? '' : 'huoqu'}>
                <div className='header'>热门搜索</div>
                <div className={newSearchList != '' ? 'qdiv1' : 'qdiv'}>搜索:<span className='span'>"{value}"</span></div>
                <div className='BestMatch'></div>
                <ul className='list'>
                    {newSearchList.map((item, index) => {
                        return (
                            <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                                <div className='searchList'>{item.name}</div>
                                <i></i>
                                <div>
                                    <span className='singer1'>{
                                        item.artists.map((song, index) => {
                                            if (index == item.artists.length - 1) {
                                                return (
                                                    <span className='singer' key={song.id}>{song.name} - {item.name}</span>
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
            </div>

        </div>)
    }
}
export default Search
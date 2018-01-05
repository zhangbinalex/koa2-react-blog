/**
 * Created by Administrator on 2017/7/13.
 */
import React from 'react'
import { connect } from 'dva';
import {Card,Icon,Spin} from 'antd'
import reqwest from 'reqwest'
import url from '../../utils/url'
import styles from './SearchResult.less'
import CardArticleList from '../../components/CardArticleList/CardArticleList'
class SearchResult extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      articleList:'',
      currentPage:1,
      pageSize:20,
      fetchingNext:false,
      fetchFinish:false
    }
  }
  replaceKey(data){
    let key=this.props.params.key
    return data.map((article)=>{
      let reg = new RegExp(key);
      article.title=article.title.replace(reg,'<span class="sKey">'+key+'</span>')
      return article
    });
  }
  fetch(key){
    this.props.dispatch({type:'IndexPage/showArticleLoading'});
    reqwest({url:url+'article/search',data:{key}}).then((data)=>{
     let articleList=this.replaceKey(data.data)
      this.setState({articleList});
      this.props.dispatch({type:'IndexPage/hideArticleLoading'});
    })
  }
  fetchNext=()=>{
    if(this.state.fetchFinish) return ;
    this.props.dispatch({type:'IndexPage/showArticleLoading'});
    this.setState({fetchingNext:true,currentPage:this.state.currentPage+1},()=>{
      reqwest({
        url:url+'article/search',
        data:{key:this.props.params.key,page:this.state.currentPage}
      }).then((data)=>{
        const nextArticleList=this.replaceKey(data.data);
        if(nextArticleList.length===0){
          this.setState({fetchFinish:true})
        }else {
          this.setState({articleList:[...this.state.articleList,...nextArticleList]})
        }
        this.setState({fetchingNext:false});
        this.props.dispatch({type:'IndexPage/hideArticleLoading'})
      })
    })
  }
  componentDidMount(){
    this.fetch(this.props.params.key)
    }
  componentWillReceiveProps(newProps){
    if(newProps.params.key!=this.props.params.key){
      this.fetch(newProps.params.key)
    }
  }
  toggleSider=(method)=>{
    this.props.dispatch({type:'IndexPage/'+method})
  }
  toTag=(id,name)=>{
    this.context.router.push({pathname:'article/tag',query:{id,name}})
  }
  render(){
    const props={
      toTag:this.toTag,
      addComment:(payload)=>{this.props.dispatch({type:'IndexPage/addComment',payload})},
      toggleSider:this.toggleSider,
      articleList:this.state.articleList,
      onBottom:this.props.IndexPage.onBottom,
      fetchNext:this.fetchNext,
      pageSize:this.state.pageSize
    }
    return (
      <div>
        <p className={styles.resP}><span className={styles.resSpan}>{this.props.params.key}</span> 的搜索结果为:</p>
        <CardArticleList {...props}  />
        {this.state.fetchingNext?<Spin style={{position:'absolute',bottom:-5,left:'44%'}} tip="正在加载..." size="large"/>:null}
        {this.state.fetchFinish?<div style={{    color: '#bcbcbc',position:'absolute',bottom:10,left:'40%',fontSize:16}}>没有更多的内容了</div>:null}
      </div>
    )
  }
}
SearchResult.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default connect(({ IndexPage }) => ({
  IndexPage,
}))(SearchResult);

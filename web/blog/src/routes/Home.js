/**
 * Created by Administrator on 2017/7/13.
 */
import React from 'react'
import { connect } from 'dva';
import {Row, Col,Tabs,Card,Icon,Spin} from 'antd'
import reqwest from 'reqwest'
const TabPane = Tabs.TabPane;
import url from '../utils/url'
import CardArticleList from '../components/CardArticleList/CardArticleList'
class Home extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state={
      articleList:'',
      currentPage:1,
      pageSize:20,
      fetchingNext:false,
      fetchFinish:false,
    }
  }
  componentDidMount(){
    this.props.dispatch({type:'IndexPage/showArticleLoading'});
      reqwest({url:url+'admin/article/get'}).then((data)=>{
        var articleList=data.data
        this.setState({articleList});
        this.props.dispatch({type:'IndexPage/hideArticleLoading'});
      })
  }
  toggleSider=(method)=>{
    this.props.dispatch({type:'IndexPage/'+method})
  }
  toTag=(id,name)=>{
    this.context.router.push({pathname:'article/tag',query:{id,name}})
  }
  fetchNext=()=>{
    if(this.state.fetchFinish) return ;
    this.props.dispatch({type:'IndexPage/showArticleLoading'});
    this.setState({fetchingNext:true,currentPage:this.state.currentPage+1},()=>{
      reqwest({
        url:url+'admin/article/get',
        data:{page:this.state.currentPage}
      }).then((data)=>{
        const nextArticleList=data.data;
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
  render(){
    const props={
      toTag:this.toTag,
      toggleSider:this.toggleSider,
      articleList:this.state.articleList,
      onBottom:this.props.IndexPage.onBottom,
      fetchNext:this.fetchNext,
      pageSize:this.state.pageSize
  };
    return (
      <div style={{position:'relative'}}>
        <CardArticleList {...props}   />
        {this.state.fetchingNext?<Spin style={{position:'absolute',bottom:-5,left:'44%'}} tip="正在加载..." size="large"/>:null}
        {this.state.fetchFinish?<div style={{    color: '#bcbcbc',position:'absolute',bottom:10,left:'40%',fontSize:16}}>没有更多的内容了</div>:null}
      </div>

    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default connect(({ IndexPage }) => ({
  IndexPage,
}))(Home);

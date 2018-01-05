/**
 * Created by Administrator on 2017/7/17.
 */
import React from 'react'
import url from '../utils/url'
import { connect } from 'dva';
import {Row, Col,Tabs,Card,Icon,Spin} from 'antd'
import reqwest from 'reqwest'
import TabsArticle from '../components/TabsArticle/TabsArticle'
class Article extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      articleList:'',
      childrens:'',
      loading:true,
      activeKey:'all',
      currentPage:1,
      pageSize:20,
      fetchingNext:false,
      fetchFinish:false
    }
  }
  fetch(type,id){
    this.props.dispatch({type:'IndexPage/showArticleLoading'});
    reqwest({
      url:url+'index/'+type,
      data:{id}
    }).then((data)=>{
      const articleList=data.data;
      const childrens=data.child;
      this.setState({articleList,childrens});
      this.props.dispatch({type:'IndexPage/hideArticleLoading'})
    })
  }
  fetchNext=()=>{
    if(this.state.fetchFinish) return ;
    this.props.dispatch({type:'IndexPage/showArticleLoading'});
    let id=this.state.activeKey==='all'?this.props.location.query.id:this.state.activeKey;
    this.setState({fetchingNext:true,currentPage:this.state.currentPage+1},()=>{
      reqwest({
        url:url+'index/'+this.props.routeParams.type,
        data:{id,
          page:this.state.currentPage}
      }).then((data)=>{
        const nextArticleList=data.data;
        if(nextArticleList.length===0){
          this.setState({fetchFinish:true})
        }else {
          if(this.state.activeKey==='all'){
            this.setState({articleList:[...this.state.articleList,...nextArticleList]})
          }else {
            const childrens=[...this.state.childrens];
            childrens.map((item)=>{
              if(item.value==this.state.activeKey){
                item.data=[...item.data,...nextArticleList]
              }
            });
            this.setState({childrens})
          }
        }

        this.setState({fetchingNext:false});
        this.props.dispatch({type:'IndexPage/hideArticleLoading'})
      })
    })
  }
  fetchChildCategory=(activeKey)=>{
    this.setState({activeKey,currentPage:1,fetchFinish:false});
    if(activeKey!='all'){
      reqwest({
        url:url+'index/'+this.props.routeParams.type,
        data:{
          id:activeKey
        }
      }).then((data)=>{
        //根据分类的id把请求的文章数据添加到对应的子分类中
        const childrens=[...this.state.childrens];
        childrens.map((item)=>{
          if(item.value==activeKey){
            item.data=data.data
          }
        });
        this.setState({childrens})

        this.props.dispatch({type:'IndexPage/hideArticleLoading'})
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.location.search!==nextProps.location.search){
      this.setState({activeKey:'all',currentPage:1,fetchFinish:false});
      this.fetch(nextProps.routeParams.type,nextProps.location.query.id)
    }
  }
  componentDidMount(){
    document.body.scrollTop=0;
    this.fetch(this.props.routeParams.type,this.props.location.query.id)
  }
  toTag=(id,name)=>{
    this.context.router.push({pathname:'/article/tag',query:{id,name}})
  }
  toggleSider=(method)=>{
    this.props.dispatch({type:'IndexPage/'+method})
  }
  render(){
    const props={
      fetchChildCategory:this.fetchChildCategory,
      toTag:this.toTag,
      type:this.props.routeParams.type,
      name:this.props.location.query.name,
      toggleSider:this.toggleSider,
      articleList:this.state.articleList,
      childrens:this.state.childrens,
      fetchNext:this.fetchNext,
      pageSize:this.state.pageSize,
      onButtom:this.props.IndexPage.onButtom
    };
    return (
      <div style={{position:'relative'}}>
        <TabsArticle  {...props} />
        {this.state.fetchingNext?<Spin style={{position:'absolute',bottom:-5,left:'44%'}} tip="正在加载..." size="large"/>:null}
        {this.state.fetchFinish?<div style={{    color: '#bcbcbc',position:'absolute',bottom:10,left:'40%',fontSize:16}}>没有更多的内容了</div>:null}
      </div>

    )
  }
}


Article.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(({ IndexPage }) => ({
  IndexPage,
}))(Article);

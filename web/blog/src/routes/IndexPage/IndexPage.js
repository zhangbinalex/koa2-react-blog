import React, { PropTypes } from 'react';
import {Header} from '../../components/Layout/index'
import NewestArticleList from '../../components/NewestArticleList/NewestArticleList'
import TagList from '../../components/TagList/TagList'
import Introduce from '../../components/Introduce/Introduce'
import { connect } from 'dva';
import url from '../../utils/url'
import styles from  './IndexPage.less'
import {Row, Col,Tabs,Card,Icon,Spin,Progress} from 'antd'
import reqwest from 'reqwest'
import Directory from 'react-article-directory'
const TabPane = Tabs.TabPane;

class IndexPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
      tagList:[],
      active:null,
      menuList:[],
      newestArticle:[],
      InitX:0,
      moveX:0,
      percent:0,
      scrollTop:0,
      go:false,
      bacList:[],
      activeRoute:null,
    }
  }
  componentWillReceiveProps(nextProps){
    let routeList= nextProps.location.pathname.substring(1).split('/');
    let activeRoute
    if(!routeList[0]){
       activeRoute='home'
    }else{
      if (routeList[0]!=='article'){
         activeRoute=routeList[0]
      }else {
        if(routeList[1]==='tag'){
           activeRoute='tag'
        }else {
           activeRoute=nextProps.location.query.name
        }
      }
    }
    this.setState({activeRoute})
  }
  handleScroll=(e)=>{
    let maxScrollTop=(document.body.scrollHeight||document.documentElement.scrollHeight)-
      (document.body.clientHeight||document.documentElement.clientHeight);
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let onBottom=maxScrollTop===scrollTop;
    if(onBottom!==this.props.IndexPage.onBottom){
      this.props.dispatch({type:'IndexPage/setOnBottom',payload:maxScrollTop===scrollTop});
    }
    this.setState({
      scrollTop:!!scrollTop
    })
  }
  componentDidMount(){
    window.QC.api("get_user_info", {})
      .success((s)=>{
        console.log(this)
        if(window.QC.Login.check()){//如果已登录
          console.log(s)
          window.QC.Login.getMe((openid, accessToken)=>{
            this.props.dispatch({type:'IndexPage/setUser',payload:{userInfo:{openid,username:s.data.nickname,avatar:s.data.figureurl_qq_1,type:'qq',isLogin:true}}})
            /*alert(["当前登录用户的", "openId为："+openId, "accessToken为："+accessToken].join("\n"));*/
          });
        }
        if(window.opener){
          window.opener.location.reload(); //刷新父窗口中的网页
          window.close()
        }
        console.log(s)
      })
      .error(function(f){
      })
      //指定接口完成请求后的接收函数，c为完成请求返回Response对象
      .complete((c)=>{
        //完成请求回调
        console.log(c)
        /*alert("获取用户信息完成！");*/
      });


    window.addEventListener('scroll',this.handleScroll);
    document.body.scrollTop=0;
    reqwest({url: url + 'admin/article/get'}).then((data) => {
      const articleList = data.data;
      let newestArticle=articleList.length>5?articleList.slice(0, 5):[...articleList];
      this.setState({articleList, newestArticle})
    });
    reqwest({url:url+'get_top_category'}).then((data)=>{
      const menuList=data.data.map((item)=>{
        return {label: item.label, icon: item.icon, url: item.pic_url, value: item.value}
      });
      const bacList=data.data.map((item)=>{
        return {label:item.label,url:item.pic_url}
      });
      bacList.push({label:'home',url:'http://i4.bvimg.com/608112/aa08b9ac86a5da5f.jpg'},
        {label:'singleArticle',url:'http://i4.bvimg.com/608112/2217625fb504ba28.png'},
        {label:'search',url:'http://i4.bvimg.com/608112/f5616d00d24645ea.png'},
        {label:'tag',url:'http://i4.bvimg.com/608112/494cda5930835cef.png'});
      this.setState({menuList,bacList})
    })
    reqwest({
      url:url+'admin/tags_info',
    }).then((data)=>{
      if(data.ret){
        let tagList=data.data.map((item)=>({label:item.tname,tid:item.tid}))
        this.setState({tagList});
      }
    })

  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.handleScroll)
  }
  toTag=(id,name)=>{
    this.context.router.push({pathname:'/article/tag',query:{id,name}})
  }
  searchArticle=(key)=>{
    if(key){
      this.context.router.push({pathname:'/search/'+key})
    }else {
      this.context.router.push({pathname:'/home'})
    }
  }
  slideInit=(e)=>{
    this.setState({InitX:e.clientX})
  }
  slideOver=(e)=>{
    if(this.state.InitX){
      if(e.clientX-this.state.InitX>=150){
        this.props.dispatch({type:'IndexPage/hideS'})
      }
      this.setState({InitX:0},()=>{this.setState({moveX:0,percent:0})})
    }
  }
  sliding=(e)=>{
    if(this.state.InitX){
      if(e.clientX-this.state.InitX>0){
        if(e.clientX-this.state.InitX>150){
          var percent=100
        }else {
          var percent=parseInt((e.clientX-this.state.InitX)*2/3)
        }
        this.setState({moveX:e.clientX-this.state.InitX,percent:percent})
      }
    }
  }
  goTop=()=>{
    this.setState({go:true})
    var topInterVal=setInterval(()=>{
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      var speed=Math.ceil(scrollTop/12)
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop - speed;
      if(scrollTop==0){
        clearInterval(topInterVal)
        this.setState({go:false})
      }
    },20)

  }

  render(){
    const introduceInfo={
      ...this.props.IndexPage.setting
    }
    const mainSpan=this.props.IndexPage.showSider?{
      md:{span:16},xs:{span:23}
    }:{
      span:23
    }
    return (
      <div  onMouseUp={this.slideOver} className={'clearfix '+styles.app} >
        {/*头部*/}
        <Header logo={this.props.IndexPage.setting.logo} logoBlack={this.props.IndexPage.setting.logoBlack} scrollTop={this.state.scrollTop} activeRoute={this.state.activeRoute} searchArticle={this.searchArticle} menuList={this.state.menuList} bacList={this.state.bacList}    />
        {/*进度条*/}
        <Progress strokeWidth={4} showInfo={false} className={styles.pro} percent={this.state.percent} />
        {/*内容区*/}

          {/*文章目录*/}
        {this.props.IndexPage.showDirectory?
          <Directory
            ref='directory'
            refresh={this.props.IndexPage.directoryRefresh}
            title="目录" id="article" offset={52} style={{topAbs:380,topFix:60}} />:null}


        <Col style={{marginTop:40}} xs={{span:22,offset:1}} md={{span:18,offset:3}} lg={{span:16,offset:4}} xl={{span:14,offset:5}} >
          <Col   style={{minHeight:1000}} {...mainSpan} >
            <div >
              {this.props.IndexPage.articleLoading?<Spin size="large" className={styles.spin} />:null}
              {this.props.children}
            </div>
          </Col>
          {/*边栏*/}
          {this.props.IndexPage.showSider?
            <Col className={styles.rContent} style={{overflow:'hidden'}} onMouseDown={this.slideInit} onMouseMove={this.sliding}  xs={{span:0}} md={{span:7,offset:1}} xl={{span:7,offset:1}} lg={{span:7,offset:1}} >
              <div style={{position:'relative',left:this.state.moveX}} className={this.state.InitX?'':styles.transition} >
                <TagList toTag={this.toTag }  tagList={this.state.tagList} />
                <Introduce {...introduceInfo} />
                <NewestArticleList newestArticle={this.state.newestArticle}/>
              </div>
          </Col>:null}
        </Col>
        {/*小火箭*/}
        {this.state.scrollTop?
          <i  onClick={this.goTop} className={this.state.go?'goTop go icon-huojiancopy iconfont':'goTop icon-huojiancopy iconfont'}  >
            <i  style={{position:'absolute',color:this.state.go?'red':''}} className="icon-huo3 iconfont fire " />
          </i>
          :null}
      </div>
    );
  }

}
IndexPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default connect(({ IndexPage }) => ({
  IndexPage,
}))(IndexPage);

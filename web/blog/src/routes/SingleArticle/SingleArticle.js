/**
 * Created by Administrator on 2017/7/17.
 */
import React from 'react'
import { connect } from 'dva';
import {Row, Col,Tabs,Card,Icon,Spin,Input,Button,message,Tag,Alert,notification,Menu,Dropdown} from 'antd'
import reqwest from 'reqwest'
import  styles from './SingleArticle.less'
import url from '../../utils/url'
class singleArticle extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      article:'',
      commentLoading:false,
      commentList:[],
      commentValue:''
    }
  }
  fetch(id){
    this.props.dispatch({type:'IndexPage/showArticleLoading'});
    reqwest({
      url:url+'admin/article/get',
      data:{aid:id,type:'click'}
    }).then((data)=>{
      if(data.ret){
        const article=data.data;
        this.setState({article},()=>{
          setTimeout(()=>{
            this.props.dispatch({type:'IndexPage/showDirectory'})
            this.props.dispatch({type:'IndexPage/setDirectoryRefresh',payload:article.aid})
          },100)

        });
      }else {
        this.setState({article:{content:'暂无内容'}});
      }
      this.props.dispatch({type:'IndexPage/hideArticleLoading'})
    })
  }
  componentWillReceiveProps(nextProps){
    if(this.props.routeParams.id!==nextProps.routeParams.id){
      this.fetch(nextProps.routeParams.id);
      this.fetchComment(nextProps.routeParams.id)
    }
    if(this.props.IndexPage.showSider!==nextProps.IndexPage.showSider){
      console.log(this.state.article.aid+Math.random())
      this.props.dispatch({type:'IndexPage/setDirectoryRefresh',payload:this.state.article.aid+Math.random()})
    }
  }
  fetchComment(id){
    this.setState({commentLoading:true});
    reqwest({
      url:url+'comment/get',
      data:{aid:id},
      method:'get',
    }).then((data)=>{
      let commentList;
      if(data.ret){
        if(data.data){
          commentList=data.data
        }else {
           commentList=[]
        }
        this.setState({commentList,commentLoading:false})
      }
    })
  }
  componentDidMount(){
    document.body.scrollTop=0;
    this.fetch(this.props.routeParams.id);
    this.fetchComment(this.props.routeParams.id)
    QC.Login({
      btnId:"qqLoginBtn"    //插入按钮的节点id
    });
  }
  componentWillUnmount(){
    this.props.dispatch({type:'IndexPage/hideDirectory'})
  }
  openLogin=()=>{
    window.open('https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101451783&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.zbzero.com', 'oauth2Login_10262' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes')
  }
  logout=()=>{
    window.QC.Login.signOut()
    this.props.dispatch({type:'IndexPage/logout'})
  }
  addComment(aid,cmid,replyContent){
    if(this.props.IndexPage.userInfo.isLogin){
      this.setState({commentLoading:true})
      reqwest({
        url:url+'comment/add',
        method:'post',
        data:{
          content:cmid?replyContent:this.state.commentValue,
          aid,...this.props.IndexPage.userInfo,
          pid:cmid?cmid:0}
      }).then((data)=>{
        if(data.ret){
          message.success('评论添加成功！')
          this.fetchComment(aid)
        }
      })
    }else {
      notification['warning']({
        placement:'bottomLeft',
        message: '请先登录！',
      });
    }
  }
  setReply(e,index){
    let commentList=this.state.commentList;
    commentList[index].replyContent=e.target.value;
    this.setState({commentList})
  }
  replyComment(index){
      if(!this.props.IndexPage.userInfo.isLogin){
        notification['warning']({
          placement:'bottomLeft',
          message: '请先登录！',
        });
      }else {
        let commentList=this.state.commentList;
        commentList[index].reply=true;
        this.setState({commentList})
      }
  }
  cancelReply(index){
    let commentList=this.state.commentList;
    commentList[index].replyContent='';
    commentList[index].reply=false
    this.setState({commentList})
  }
  toTag=(id,name)=>{
    this.context.router.push({pathname:'article/tag',query:{id,name}})
  };
  render(){
    const menu = (
      <Menu>
        <Menu.Item>
          <a className={styles.logout} onClick={this.logout}>退出</a>
        </Menu.Item>
      </Menu>
    );
    const colorList=['#f50','#2db7f5','#87d068','#108ee9','rgb(0, 133, 161)']
    const props={
      toggleSider:(method)=>{this.props.dispatch({type:'IndexPage/'+method})},
      url:url+'index/index/'+this.props.routeParams.type,
      name:this.props.location.query.name
    }
    let showSider=this.props.IndexPage.showSider;
    let iStyle={
        style:{
          fontSize:showSider?20:23
        },
        className:`${styles.sizeI} iconfont ${showSider?'icon-quanping1 ':'icon-suoxiaotuichuquanpingshouhui'}`,
        onClick:()=>{this.props.dispatch({type:`IndexPage/${showSider?'hideS':'showS'}`})}
    };

    return (
      <div  >
        <Card   className={styles.singleCard+' '+(this.state.article?styles.doneCard:styles.InitCard) }         >
          <div ref="car" className={styles.content}>

            <div className="ant-card-abs">
             <a onClick={()=>{window.history.go(-1)}} >返回 <Icon className="rotate" type="up" /></a>
            </div>
            <div className={"clearfix "+styles.articleHeader} >
              {this.state.article.tags?
                <span className={styles.absTags}>{this.state.article.tags.length>0?<Icon className={styles.tagIcon} type="tag-o" />:null} {this.state.article.tags.map((tag,index)=>{
                  const randomColor=colorList[parseInt(Math.random()*colorList.length)]
                  return <Tag onClick={()=>{this.toTag(tag.tid,tag.tname)}}
                              key={index}
                              style={{borderColor:randomColor,color:randomColor }} >
                            {tag.tname}
                          </Tag>
                })}</span>:
              null}
              <i {...iStyle}/>
            </div>
            <p  className={styles.articleTitle} >{this.state.article.title}</p>
            <p className={styles.articleInfo}>
              <span><Icon type="clock-circle-o"  /> {this.state.article.create_time}</span>
              <span className={styles.click}><Icon type="eye"  /> 阅读量:{this.state.article.click}</span>
              <span className={styles.comment}><Icon type="message"  /> 评论:{this.state.article.comment_count}</span>
            </p>
            <p className={styles.articleContent} id="article" ref="article"  dangerouslySetInnerHTML={{__html:this.state.article.content}}></p>

          </div>
          <Card  className={styles.commentCard} title={this.state.commentList.length>0?this.state.commentList.length+' 条评论':'暂无评论'}   style={{  }}>
              <ul>
                {this.state.commentList.map((comment,index)=>{
                  return (
                    <li key={index}  className={styles.commentLi}>
                      <div className={styles.commentHeader}>
                        <img style={{float:'left',width:20,height:20,borderRadius:2,marginRight:6}} src={comment.avatar?comment.avatar:''} />
                        <span style={{float:'left',lineHeight:'20px'}}>{comment.username?comment.username:'游客'}</span>
                        {comment.pUsername?
                          <span><span style={{fontSize:10,marginRight:8,marginLeft:8,color:'#108ee9'}}>回复</span>{comment.pUsername}</span>
                          :null
                        }
                        <span className={styles.commentCreateTime}>
                            {comment.create_time}
                          </span>
                      </div>
                      <p className={styles.commentContent}>
                        {comment.content}
                      </p>
                      {
                        this.props.IndexPage.userInfo.isLogin?
                        comment.reply?
                        <div style={{paddingRight:140,position:'relative'}}>
                          <Input type="textarea"  placeholder="请输入评论..." value={comment.replyContent}  onChange={(e)=>{this.setReply(e,index)   }} autosize />
                          <Button className={styles.cancelReply}  onClick={()=>{this.cancelReply(index)}}>取消</Button>
                          <Button className={styles.replyBtn} type="primary" onClick={()=>{this.addComment(this.state.article.aid,comment.cmid,comment.replyContent)}}>评论</Button>
                        </div>
                      :
                        <a className={styles.replyA} onClick={()=>{this.replyComment(index)}}>回复</a>
                      :null}

                    </li>
                  )
                })}
              </ul>
              <div className={styles.writeComment}>

                {this.state.commentLoading?<Spin  />:null}
                <Input type="textarea"  placeholder="请输入评论..." value={this.state.commentValue}  onChange={(e)=>{this.setState({commentValue:e.target.value}) }} autosize />
                <Button className={styles.commentBtn} type="primary" onClick={()=>{this.addComment(this.state.article.aid)}}>评论</Button>
              </div>
            {this.props.IndexPage.userInfo.isLogin?
              <div className="clearfix">
                <img style={{height:30,width:30,borderRadius:30,marginRight:5,float:'left'}} src={this.props.IndexPage.userInfo.avatar} alt=""/>
                <Dropdown overlay={menu} >
                  <a className={styles.dropdown} href="#">
                    {this.props.IndexPage.userInfo.username} <Icon type="down" />
                  </a>
                </Dropdown>
              </div>:
              <i onClick={this.openLogin}  className={"icon-QQ iconfont "+styles.logBtn}/>


            }
            </Card>
        </Card>
      </div>

    )
  }
}

singleArticle.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default connect(({ IndexPage }) => ({
  IndexPage,
}))(singleArticle);

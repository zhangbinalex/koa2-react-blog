/**
 * Created by Administrator on 2017/7/13.
 */
import React from 'react'
import {Row, Col,Tabs,Card,Icon,Input,Button,Spin,Tag} from 'antd'
import reqwest from 'reqwest'
import  styles from './CardArticleList.less'
import { Link } from 'react-router'
const TabPane = Tabs.TabPane;
class CardArticleList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      articleList:'',
      active:null,
      commentValue:'',
      commentLoading:false
    }
  }
  componentDidMount(){
      document.body.scrollTop=0
      const articleList=this.props.articleList;
      this.setState({articleList})
  }
  componentWillReceiveProps(newProps){
    if(this.props.urlParams!=newProps.urlParams){
      this.setState({active:null})
    }
    this.setState({
        articleList:newProps.articleList
    })

    if(!newProps.commentLoading){
      this.setState({commentLoading:false,commentValue:''})
    }
  }
  showArticle(index,aid){
    if(document.body.scrollTop>80){
      document.body.scrollTop=80
    }
    this.props.toggleSider('hideS');
    this.props.fetchComment(aid)
    this.setState({active:index})

  }
  hideArticle(){
      document.body.scrollTop=0;
    this.props.toggleSider('showS')
    this.setState({active:null})

  }
  addComment(aid){
    this.setState({commentLoading:true})
    this.props.addComment({content:this.state.commentValue,aid})
  }
  render(){
    const colorList=['#f50','#2db7f5','#87d068','#108ee9','rgb(0, 133, 161)']
    console.log(222,this.state.articleList)
    return (
      <div>
        {(typeof this.state.articleList=='object'&&this.state.articleList.length==0)?
          <span className={styles.blank}> 暂无相关文章(┬＿┬)</span>:''}
        {this.state.articleList.length>0?this.state.articleList.map((item,index)=>(
          <Card  className={styles.articleCard}   bodyStyle={{}} key={index}  >
            <div className={styles.cardCname}>
              {item.cname}
            </div>
            <div className={styles.por}>
              <div className="ant-card-abs">
                <Link  to={{pathname:'singleArticle/'+item.aid}}>阅读全文<Icon className="rotate" type="down" /></Link>
              </div>
              <p   className={styles.articleTitle}  dangerouslySetInnerHTML={{__html:item.title}} ></p>
              <p className="articleContent"></p>
              <p className={styles.apHover} style={{fontSize:14,marginTop:15}}>
                <span><Icon type="clock-circle-o"  /> {item.create_time}</span>
                <span className={styles.click}><Icon type="eye"  /> 阅读量:{item.click}</span>
                <span className={styles.comment}><Icon type="message"  /> 评论:{item.comment_count}</span>
              </p>
              <span  className={styles.tagGroup} style={{display:item.tag.length>0?'block':'none'}}><Icon className={styles.tagIcon} type="tag-o" /> {item.tags?item.tags.map((tag,subIndex)=>{
                const randomColor=colorList[parseInt(Math.random()*colorList.length)]
                return <Tag  onClick={()=>{this.props.toTag(tag.tid,tag.tname)}}   key={subIndex} style={{borderColor:randomColor,color:randomColor }} >{tag.tname}</Tag>
              }):''}</span>
            </div>

          </Card>
        )   ):''}
      </div>
    )
  }
}
export  default  CardArticleList

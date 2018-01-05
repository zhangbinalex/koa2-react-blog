/**
 * Created by Administrator on 2017/7/13.
 */
import React from 'react'
import {Card,Icon,Tag,Spin} from 'antd'
import  styles from './CardArticleList.less'
import { Link } from 'react-router'

class CardArticleList extends React.PureComponent{
  componentWillReceiveProps(nextProps){
    if(nextProps.onBottom!==this.props.onBottom){
      if(nextProps.onBottom&&this.props.articleList&&this.props.articleList.length>=this.props.pageSize){
        this.props.fetchNext()
    }
   }
  }
  render(){
    const colorList=['#f50','#2db7f5','#87d068','#108ee9','rgb(0, 133, 161)'];
    return (
      <div style={{position:'relative',paddingBottom:55}}>
        {( this.props.articleList instanceof Array&&this.props.articleList.length===0)?
          <span className={styles.blank}> 暂无相关文章(┬＿┬)</span>:''}
        {this.props.articleList.length>0?this.props.articleList.map((item,index)=>(
          <Card  className={styles.articleCard}   bodyStyle={{}} key={index}  >
            <div className={styles.cardCname}>
              {item.cname}
            </div>
            <div className={styles.por}>
              <div className="ant-card-abs">
                <Link  to={{pathname:'singleArticle/'+item.aid}}>阅读全文<Icon className="rotate" type="down" /></Link>
              </div>
              <p   className={styles.articleTitle}  dangerouslySetInnerHTML={{__html:item.title}} ></p>
              <p className={styles.apHover} style={{fontSize:14,marginTop:15}}>
                <span><Icon type="clock-circle-o"  /> {item.create_time}</span>
                <span className={styles.click}><Icon type="eye"  /> 阅读量:{item.click}</span>
                <span className={styles.comment}><Icon type="message"  /> 评论:{item.comment_count}</span>
              </p>
              <span  className={styles.tagGroup} style={{display:item.tag.length>0?'block':'none'}}>
                <Icon className={styles.tagIcon} type="tag-o" />
                  {item.tags?item.tags.map((tag,subIndex)=>{
                    const randomColor=colorList[parseInt(Math.random()*colorList.length)];
                    return <Tag  onClick={()=>{this.props.toTag(tag.tid,tag.tname)}}
                                 key={subIndex}
                                 style={{borderColor:randomColor,color:randomColor }} >
                              {tag.tname}
                            </Tag>
                  }):null}
              </span>
            </div>
          </Card>
        )   ):null}
      </div>
    )
  }
}
export  default  CardArticleList

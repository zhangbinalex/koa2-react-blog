/**
 * Created by Administrator on 2017/7/13.
 */
import React from 'react';
import {Tabs,Icon} from 'antd'
import { connect } from 'dva';
import styles from './TabsArticle.less'
import CardArticleList from '../CardArticleList/CardArticleList'
const TabPane = Tabs.TabPane;
class TabsArticle extends React.Component{
  render(){
    const cardProps={
      pageSize:this.props.pageSize,
      fetchNext:this.props.fetchNext,
      onBottom:this.props.onBottom,
      toTag:this.props.toTag,
      toggleSider:this.props.toggleSider,
    }
    return (
      <div className={styles.container}  >
            <Tabs type="card"  className={styles.tabs} tabPosition="top" onChange={(key)=>{this.props.fetchChildCategory(key)}} >
              <TabPane tab={this.props.type=='tag'?<span><Icon type="tag" />{this.props.name}</span>:'全部'} key="all">
                  <CardArticleList {...cardProps}  articleList={this.props.articleList} />
              </TabPane>
              {
                this.props.childrens?this.props.childrens.map((item)=>{
                  return(
                    <TabPane tab={<span>{item.icon?<Icon type={item.icon}/>:null}{item.label}</span>} key={item.value}>
                      <CardArticleList {...cardProps}  articleList={item.data?item.data:''} />
                    </TabPane>
                  )
                }):null
              }
            </Tabs>
      </div>
    );
  }


}


export default TabsArticle

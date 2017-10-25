/**
 * Created by Administrator on 2017/7/13.
 */
import React from 'react';
import {Row, Col,Tabs,Card,Icon,Spin} from 'antd'
import styles from './TabsArticle.less'
import CardArticleList from '../CardArticleList/CardArticleList'
const TabPane = Tabs.TabPane;
class TabsArticle extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      articleList: '',
      childrens:[],

    }
  }
  componentDidMount(){

    document.body.scrollTop=0;
    this.setState({articleList:this.props.articleList,childrens:this.props.childrens})
  }
  componentWillReceiveProps(newProps){
    if(newProps.articleList!==this.props.articleList){
      document.body.scrollTop=0;
      this.setState({articleList:newProps.articleList,childrens:newProps.childrens})
    }
  }
  render(){
    console.log(123,this.props.articleList)
    return (

      <div className={styles.container}  >
            <Tabs type="card"  className={styles.tabs} tabPosition="top" onChange={(key)=>{this.props.fetchChildCategory(key)}} >
              <TabPane tab={this.props.type=='tag'?<span><Icon type="tag" />{this.props.name}</span>:'全部'} key="all">
                  <CardArticleList toTag={(id,name)=>{this.props.toTag(id,name)}} urlParams={this.props.urlParams}   toggleSider={(method)=>{this.props.toggleSider(method)}}  articleList={this.state.articleList} />
              </TabPane>
              {
                this.state.childrens?this.state.childrens.map((item,index)=>{
                  return(
                    <TabPane tab={<span>{item.icon?<Icon type={item.icon}/>:''}{item.label}</span>} key={item.value}>
                      <CardArticleList toTag={(id,name)=>{this.props.toTag(id,name)}} urlParams={this.props.urlParams}  toggleSider={(method)=>{this.props.toggleSider(method)}}  articleList={item.data?item.data:[]} />
                    </TabPane>
                  )
                }):''
              }
            </Tabs>
      </div>
    );
  }


}

TabsArticle.propTypes = {
};

export default TabsArticle

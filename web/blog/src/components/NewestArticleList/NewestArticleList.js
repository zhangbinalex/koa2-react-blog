/**
 * Created by Administrator on 2017/7/12.
 */
import React from 'react'
import  {Icon,Card} from  'antd'
import  styles from './NewestArticleList.less'
import { Link } from 'react-router'
class NewestArticleList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      newestArticle:[]
    }
  }
  componentWillReceiveProps(newProps){
    this.setState({newestArticle:newProps.newestArticle})
  }
  componentDidMount(){
    this.setState({newestArticle:this.props.newestArticle})
  }
  render(){
    return (
      <div>
        <Card  title={<p style={{fontSize:16}}><Icon type="clock-circle-o" /> 最近文章</p>} >
          <ul>
            {this.state.newestArticle.map(function (item,index) {
              return ( <li className="clearfix" key={index} style={{marginTop:4}}><Link className={styles.articleLink} to={{pathname:'singleArticle/'+item.aid}} ><span className={styles.articleIndex} >{index+1}.</span> <span className={styles.title}>{item.title}</span></Link></li> )
            })}
          </ul>
        </Card>
      </div>
    )
  }
}


export default NewestArticleList

/**
 * Created by Administrator on 2017/7/5.
 */
import React from  'react'
import { Menu,Icon, Popover,Button,Input} from 'antd'
import  styles from './index.less'
import ThemeMenu from './ThemeMenu'
const defaultBac='http://i4.bvimg.com/608112/aa08b9ac86a5da5f.jpg';
class Header extends React.PureComponent{
  constructor(props)
  {
    super(props);
    this.state={
      current:null,
      key:"",
      bac:'bac.jpg',
      fade:'',
      backgroundUrl:defaultBac
    }
  }
  componentWillReceiveProps(newProps){
    newProps.scrollTop===true?this.setState({fade:styles.fadeIn}):this.setState({fade:styles.fadeOut});
  }
  searchArticle=(e)=>{
    if(e.keyCode===13){
        this.props.searchArticle(this.state.key)
    }
  }
  render(){
    const selectedKeys=this.props.activeRoute;
    return (
      <div className={styles.container}>
        <div className={"clearfix "+ styles.header}   >
          <span className={styles.logoSpan}>
                      <img className={styles.logo} src={this.props.logo} alt="logo"/>
          </span>
          {/*导航栏*/}
          <ThemeMenu menuList={this.props.menuList} selectedKeys={selectedKeys} classN={styles.menu} />
          {/*搜索*/}
          <Button.Group className={styles.searchBtnGroup}>
            <Input onKeyUp={this.searchArticle} value={this.state.key}  onChange={(e)=>{this.setState({key:e.target.value}) }} className={styles.searchInput}  />
            <Button className={styles.searchBtn} onClick={()=>{ this.props.searchArticle(this.state.key)}}><Icon type="search"/>站内搜索</Button>
          </Button.Group>
          {/*背景图*/}
          {this.props.bacList.map((bac,index)=>{
            return (
              <div key={index} className={styles.fadeBacImg+' '+(this.props.activeRoute===bac.label?styles.fadeActive:'')} style={{backgroundImage:`url(${bac.url})`}} />
            )
          })}
          <p className={styles.bacKeyword}>
            {this.props.activeRoute}
          </p>
        </div>

        {/*固定定位头*/}
        <div className={'clearfix '+styles.fixHeader+' '+this.state.fade}  >
          <span className={styles.logoSpan}>
              <img className={styles.logo} src={this.props.logoBlack} alt=""/>
          </span>
          <ThemeMenu menuList={this.props.menuList}  selectedKeys={selectedKeys} classN={styles.menuFixed} />
          <Button.Group className={styles.searchBtnGroup}>
            <Input onKeyUp={this.searchArticle} value={this.state.key}  onChange={(e)=>{this.setState({key:e.target.value}) }} className={styles.searchInputFixed}  />
            <Button className={styles.searchBtnFixed} onClick={()=>{ this.props.searchArticle(this.state.key)}}><Icon type="search"/>站内搜索</Button>
          </Button.Group>
        </div>
      </div>


    )
  }
}
export default Header

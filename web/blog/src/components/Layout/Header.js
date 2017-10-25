/**
 * Created by Administrator on 2017/7/5.
 */
import React from  'react'
import { Link } from 'react-router'
import {Menu, Icon, Popover,Button,Input} from 'antd'
import  styles from './index.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const defaultBac='http://i4.bvimg.com/608112/aa08b9ac86a5da5f.jpg'
class Header extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      current:this.props.current,
      key:"",
      bac:'bac.jpg',
      fullPath:'../../assets/img/bac.jpg',
      fade:'',
      backgroundUrl:defaultBac
    }
  }
  componentWillReceiveProps(newProps){
    //只在初始化current没值时使用props传来的值
    if(!this.state.current){
      if(newProps.activeRoute){
        this.setState({current:newProps.activeRoute})
      }
    }
    if(newProps.scrollTop===true){
      this.setState({fade:styles.fadeIn})
    }
    if(newProps.scrollTop===false)
    {
      this.setState({fade:styles.fadeOut})
    }
   /* if(newProps.current!=this.state.current){
      console.log(newProps)
      this.setState({current:newProps.current})
    }*/
  }
  searchArticle=(e)=>{
    if(e.keyCode==13){
        this.props.searchArticle(this.state.key)
    }
  }
  handleClick=(e)=>{
    this.setState({
      current: e.key,
    });
  }
  render(){
    return (
      <div className={styles.container}>
        <div className={"clearfix "+ styles.header}   >
          <span className={styles.logoSpan}>
                      <img className={styles.logo} src={this.props.logo} alt="logo"/>
          </span>

          {/*背景图*/}
          {this.props.bacList.map((bac,index)=>{
            return (
              <div key={index} className={styles.fadeBacImg+' '+(this.props.activeRoute==bac.label?styles.fadeActive:'')} style={{backgroundImage:`url(${bac.url})`}} />
            )
          })}
          <p className={styles.bacKeyword}>
            {this.props.activeRoute}
          </p>
          {/*导航栏*/}
          <Menu

            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            className={styles.menu}
            mode="horizontal">
            <Menu.Item key="home">
              <Link to="/home"><span><Icon type="home" />首页</span></Link>
            </Menu.Item>
            {this.props.menuList.map((route)=>{
              return (
                <Menu.Item key={route.label}>
                  <Link to={{pathname:'/article/category',query:{id:route.value,type:'category',name:route.label}}} ><span><Icon type={route.icon} />{route.label}</span></Link>
                </Menu.Item>
              )
            })}
            <Menu.Item>
              <a href="../application/admin/view/index/index.html"><span><Icon type="setting" />网站设置</span></a>
            </Menu.Item>
          </Menu>

          {/*搜索*/}
          <Button.Group className={styles.searchBtnGroup}>
            <Input onKeyUp={this.searchArticle} value={this.state.key}  onChange={(e)=>{this.setState({key:e.target.value}) }} className={styles.searchInput}  />
            <Button className={styles.searchBtn} onClick={()=>{ this.props.searchArticle(this.state.key)}}><Icon type="search"></Icon>站内搜索</Button>
          </Button.Group>
        </div>

        {/*固定定位头*/}
        <div className={'clearfix '+styles.fixHeader+' '+this.state.fade}  >
          <span className={styles.logoSpan}>
              <img className={styles.logo} src={this.props.logoBlack} alt=""/>
          </span>
          <Menu
            className={styles.menuFixed}
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal">
            <Menu.Item key="index">
              <Link to="/home"><span><Icon type="home" />首页</span></Link>
            </Menu.Item>
            {this.props.menuList.map((route)=>{
              return (
                <Menu.Item key={route.label}>
                  <Link to={{pathname:'/article/category',query:{id:route.value,name:route.label,type:'category'}}} ><span><Icon type={route.icon} />{route.label}</span></Link>
                </Menu.Item>
              )
            })}
            <Menu.Item>
              <a href="../application/admin/view/index/index.html"><span><Icon type="setting" />网站设置</span></a>
            </Menu.Item>
          </Menu>
          <Button.Group className={styles.searchBtnGroup}>
            <Input onKeyUp={this.searchArticle} value={this.state.key}  onChange={(e)=>{this.setState({key:e.target.value}) }} className={styles.searchInputFixed}  />
            <Button className={styles.searchBtnFixed} onClick={()=>{ this.props.searchArticle(this.state.key)}}><Icon type="search"></Icon>站内搜索</Button>
          </Button.Group>
        </div>
      </div>


    )
  }
}
export default Header

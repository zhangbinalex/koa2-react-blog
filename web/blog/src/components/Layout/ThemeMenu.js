import {Menu, Icon,Input} from 'antd'
import { Link } from 'react-router'
import React from 'react'

class ThemeMenu extends React.PureComponent{
  render(){
    return (
      <Menu
        selectedKeys={[this.props.selectedKeys]}
        className={this.props.classN}
        mode="horizontal">
      <Menu.Item key="home">
        <Link to="/home"><span><Icon type="home" />首页</span></Link>
      </Menu.Item>
      {this.props.menuList.map((route)=>{
        return (
          <Menu.Item key={route.label}>
            <Link to={{pathname:'/article/category',query:{id:route.value,name:route.label}}} ><span><Icon type={route.icon} />{route.label}</span></Link>
          </Menu.Item>
        )
      })}
      <Menu.Item>
        <a href="../application/admin/view/index/index.html"><span><Icon type="setting" />网站设置</span></a>
      </Menu.Item>
    </Menu>
    )
  }
}
export default ThemeMenu

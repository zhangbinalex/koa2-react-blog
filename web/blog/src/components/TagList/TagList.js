/**
 * Created by Administrator on 2017/7/12.
 */
import React from 'react'
import  {Icon,Card,Tag} from  'antd'
class tagList extends React.PureComponent{
  render(){
    const colorList=['#f50','#2db7f5','#87d068','#108ee9','rgb(0, 133, 161)'];
    return (
      <div>
        <Card  title={<p className="moduleTitle"><Icon type="tag-o" /> 标签</p>} >
            {this.props.tagList.map((item,index)=> {
              const randomColor=colorList[parseInt(Math.random()*colorList.length)]
              return (
                <Tag onClick={() => {this.props.toTag(item.tid, item.label)}}
                     key={index}
                     style={{marginTop: 10, marginLeft: 5, borderColor: randomColor, color: randomColor}}>
                  {item.label}
                </Tag>
              )
            })}
        </Card>
      </div>
    )
  }
}
export default tagList

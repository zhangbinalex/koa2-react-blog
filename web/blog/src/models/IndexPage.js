import reqwest from 'reqwest'
import {message} from 'antd'
import url from '../utils/url'
export default {

  namespace: 'IndexPage',

  state: {
    url:'http://www.guijianshi.cn/',
    showSider:true,
    commentList:[],
    commentLoading:false,
    articleLoading:false,
    userInfo:{
      isLogin:false,
      openid:'',
      avatar:'',
      type:'',
      username:''
    },
    setting:{
      zhihu:'',
      sina:'',
      email:'',
      github:'',
      introduce:'',
      logo:'',
      avatar:''
    },
    showDirectory:false,
    directoryRefresh:'',
    onBottom:false
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({type:'getSetting'})
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getSetting({ payload },{call,put}){
      const data=yield call(function request(){
        return reqwest({
          url:url+'admin/setting',
          method:'get',
        }).then((data)=>{return data})
      });
      if(data.ret==1){
        yield put({type:'saveSetting',payload:data.data})
      }
    }
  },

  reducers: {
    saveSetting(state,{payload}){
      return {...state,setting:payload}
    },
    setUser(state,{payload}){
      return { ...state,...payload };
    },
    logout(state){
      return {...state,userInfo:{
        isLogin:false,
        openId:'',
        avatar:'',
        type:'',
        username:''
      }}
    },
    showS(state) {
      return { ...state, showSider:true };
    },
    hideS(state) {
      return { ...state, showSider:false };
    },
    showComment(state,{payload}) {
      return { ...state, ...payload};
    },
    showCommentLoading(state){
      return {...state,commentLoading:true}
    },
    showArticleLoading(state){
      return {...state,articleLoading:true}
    },
    hideArticleLoading(state){
      return {...state,articleLoading:false}
    },
    showDirectory(state,){
      return {...state,showDirectory:true}
    },
    hideDirectory(state,){
      return {...state,showDirectory:false}
    },
    setDirectoryRefresh(state,{payload}){
      return {...state,directoryRefresh:payload}
    },
    setOnBottom(state,{payload}){
      return {...state,onBottom:payload}
    },
  },

};

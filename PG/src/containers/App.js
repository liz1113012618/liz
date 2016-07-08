'use strict'
var React=require('react-native');
var {
   AppRegistry,
  Component,
   StyleSheet,
  Navigator,
  AsyncStorage,
    Alert,
  Linking, 
  View
}= React;
var TimerMixin = require('react-timer-mixin'); 
//var Immutable = require('immutable');
var DataAPI = require('../utils/DataAPI');
var DataKEY = require('../utils/DataKEY');

var Login = require('../containers/main/LoginPage');
var Splash = require('../containers/main/SplashPage');




var App = React.createClass({
	
	mixins: [TimerMixin],
	 async componentDidMount() {
	    this.setTimeout(
	      () => {
			this.setState({splashed: true});
	      },
	      2000,
	    );

    var name = await AsyncStorage.getItem(DataKEY.USER_NAME);
    var pwd = await AsyncStorage.getItem(DataKEY.USER_PWD);
    var rem = await AsyncStorage.getItem(DataKEY.USER_REM_PWD); 
    var obj = eval('(' + rem + ')');  
    if (obj)
  {
   this.setState({
    username:name,
    password:pwd,
    selected:obj,
  });
   var url = DataAPI.login;
   var loginUserName = name;
   var password = pwd;
   fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        mobileKey:DataAPI.mobileKey,
        osType:DataAPI.osType,
        version:DataAPI.sysVersion,
        loginUserName:loginUserName,
        password: password,
    })
  }).then(res => res.json())
   .then(res => this.processLoginData(res));
   
  }     
	},

   processLoginData(res){
    if(!res.succ){
      alert(res.msg);
      return;
    }
   this.checkForUpdate(res);    
  },
  checkForUpdate(res) {
  
    var version=res.version;
    var SYS_VER=DataAPI.sysVersion;
    var updateURL=res.updateUrl;
    if (SYS_VER!==version) {
      Alert.alert('更新提醒','请更新到最新版本!' ,[{text:'立即更新', onPress:() => Linking.openURL(updateURL)}]);
   }
   else 
    {
     // this.stepMainPage();    
      if (res.roleId.toString()==='7') {
         this.processStorageData(res);
         this.stepMainPage();
      }
      else {
        alert('请输入正确帐号或密码');
      }

   }
  },
  processStorageData(res){
  var converted=this.state.selected;

  AsyncStorage.setItem(DataKEY.USER_ROLE_ID, res.roleId.toString());
  AsyncStorage.setItem(DataKEY.USER_REAL_NAME, res.realName);

  AsyncStorage.setItem(DataKEY.USER_NAME, res.loginUserName);
  AsyncStorage.setItem(DataKEY.USER_PWD, this.state.password);
  AsyncStorage.setItem(DataKEY.USER_REM_PWD,converted.toString());
    
  AsyncStorage.setItem(DataKEY.USER_ID, res.id.toString());
  AsyncStorage.setItem(DataKEY.USER_STORE_CODE, res.storeCode);
   AsyncStorage.setItem(DataKEY.USER_REM_ISWORK, res.iswork.toString());
  
  },
  
  stepMainPage() {
    
       this.props.navigator.push({
      id: 'MainPagePG',
      name:'主页',
    });
   
  },
	
	login(){
      this.setState({logined:true});
    },
    
    logout(){
      this.setState({logined:false});
    },

    componentWillMount(){
    },

    // 状态初始化
    getInitialState(){
      return {
          //data:Immutable.fromJS(this.data),// 模拟的初始化数据
          //todoName:'',// 新任务的text
          //curFilter:'all',// 过滤条件 all no ok
          logined: false,
          splashed:false,
        
          username: null,
          password: null,
          selected:false,
      }
    },

    // 这里组合子view组件 并 注册业务逻辑对象提供的方法到各个子view组件上
    render(){
    
    	if(!this.state.splashed && !this.state.selected){
    		return ( <Splash />);
    	}
    	
    	if(!this.state.logined && !this.state.selected){
    		return ( <Login login={this.login} navigator={this.props.navigator} /> );
    	}
      return(<View style={{flex:1}}></View>);
  
    },

});

module.exports = App;

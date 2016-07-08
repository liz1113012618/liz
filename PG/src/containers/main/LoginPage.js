/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
  AppRegistry,
  Component,
  TouchableHighlight,
  StyleSheet,
  Navigator,
  Text,
  TextInput,
  View,
  Navigator,
  TouchableOpacity,
  ToolbarAndroid,
  AsyncStorage,
  Alert,
  Linking, 
   Switch,
}= React;
var GiftedSpinner = require('react-native-gifted-spinner');
import Modal from 'react-native-root-modal';

var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome')
var dismissKeyboard =require('dismissKeyboard');


class LoginPage extends Component {
 dismiss() {
  dismissKeyboard();
 }
  async componentDidMount() {
    
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
  
  }
}
OnValueChange() {
    this.setState({selected:!this.state.selected});
   }

 constructor(props) {
    super(props);
    this.state ={
      visible: false,
      value: {
        username: null,
        password: null
      },
      selected:false,
    };
  }
   showModal = () => {
        this.setState({
            visible: true
        });
    };

    hideModal(res) {
        this.setState({
            visible: false
        });
        this.checkForUpdate(res);          
    };

    componentWillUnmount() {
      // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.dismiss();
    this.timer && clearTimeout(this.timer);
    }
  
  render() {
    
    return (
		<View style={styles.container}>
        <View style={styles.ViewTitle}>
          <Text style={styles.TitleText}>
           促销员管理
          </Text>
        </View>
        <View style={styles.ViewBorder}>
          <View style={styles.ViewAccount}>
          <Icon name='user' size={20} color='#142EB6' style={{margin:7}} />  
            <View style={styles.AccountView}>
                <TextInput underlineColorAndroid='transparent' defaultValue={this.state.username} style={styles.AccountTextInput} placeholder='请输入您的账户' onChangeText={(text) => this.setState({username:text})}/>  
            </View>
          </View>

          <View style={styles.ViewPassword}>
          <Icon name='lock' size={20} color='#142EB6' style={{margin:7}} />
            <View style={styles.PasswordView}>
               <TextInput underlineColorAndroid='transparent' defaultValue={this.state.password} style={styles.PasswordTextInput} placeholder='请输入您的密码' maxLength={6}  onChangeText={(text) => this.setState({password:text})} secureTextEntry={true} keyboardType='numeric'/>  
            </View>
          </View>
        </View>
        <TouchableHighlight   underlayColor='#ffcc00' onPress={this.gotoNext.bind(this)} style={styles.buttonview} >
          <Text style={styles.logintext}>登 陆</Text>
        </TouchableHighlight>

         <View style={{alignItems:'flex-end',marginRight:30,}}>
      <View style={{height:40,alignItems:'center',justifyContent:'center', flexDirection:'row',}}>
      <View style={{margin:10}}>
        <Text style={{textAlign:'center',fontSize:15,color:'white'}}>记住密码</Text>
        </View>
        <Switch onValueChange={(value)=>this.OnValueChange(value)} value={this.state.selected}></Switch>
      </View>
      </View>
     
        <View style={styles.ViewInformation}>
            <View style={styles.InformationView}>
              <Text style={styles.VersionInformationText}>系统版本：1.0</Text>
              <Text style={styles.PhotoInformationText}>客服电话：021-56511271</Text>
              <Text style={styles.LogoInformationText}>DUTCH LADY</Text>
            </View>
        </View>  
        <Modal style={styles.modal} visible={this.state.visible} >            
          <GiftedSpinner />
        </Modal>   
      </View>  
    );
  }
 
  gotoNext() {
    this.dismiss();
  	var url = DataAPI.login;
  	if(!this.state.username||this.state.username.length==0){
  		Alert.alert('温馨提醒','请输入账户！');
  		return;
  	}
  	
  	if(!this.state.password||this.state.password.length==0){
  		Alert.alert('温馨提醒','请输入密码！');
  		return;
  	}
    //打开遮盖组建
   this.setState({visible:true});  
   var loginUserName = this.state.username;
   var password = this.state.password;
  
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



	
  }
  
  processLoginData(res){
  	if(!res.succ){
      this.setState({visible:false});
  		 Alert.alert('温馨提醒',res.msg);
  		return;
  	}
   this.timer = setTimeout(
        ()=>{this.hideModal(res);},
        500
        ); 
  }
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
        Alert.alert('温馨提醒','请输入正确帐号或密码');
      }

   }
  }
  stepMainPage() {
    
       this.props.navigator.push({
      id: 'MainPagePG',
      name:'主页',
    });
   
  }
}

const styles = StyleSheet.create({
   container: { 
    flex: 1,
    backgroundColor: '#142EB6'},
  ViewTitle: {
     justifyContent:'flex-end',
     height: 80},
  TitleText: {
      marginBottom:1,
      fontSize:30 ,
      color: '#FFFFFF',
      textAlign: 'center' },
  ViewBorder: {  
    marginTop:5,
    marginLeft:30,
    marginRight:30, 
    height: 100, 
    backgroundColor: 'white',
    borderRadius:8},
  ViewAccount: {
    height:40,
    flexDirection: 'row',
    marginTop:10,
    marginLeft:0,
    marginRight:0,
    justifyContent: 'flex-start'},
    AccountTextInput: {
    height: 40},
  AccountView: {
    flex:1,
    height:40,
    alignSelf:'center',
    justifyContent: 'center'},
  ViewPassword: { 
      height:40,
      marginBottom:10,
      marginLeft:0,
      marginRight:0,
      flexDirection: 'row',
      justifyContent: 'center'},
  PasswordView: {  
    flex:1,
     height:40,
     alignSelf:'center',
     justifyContent: 'center'},
     PasswordTextInput: {
     height: 40},  
  buttonview: {    
        backgroundColor: 'white',  
        margin:30,
        borderRadius: 6,  
        justifyContent: 'center',  
        alignItems: 'center'},  
  logintext: {  
        fontSize: 17,  
        color: '#142EB6',  
        marginTop: 10,  
        marginBottom: 10},  
  ViewInformation: {
      flex:10,
      alignItems: 'center',
       justifyContent: 'flex-end' },
  InformationView: {
    height:100,
    width:250,
    marginBottom:20,
    flexDirection: 'column',
    },
  VersionInformationText: {
    fontSize:15,
    height:20,
    color:'white',
    textAlign: 'center'},
  PhotoInformationText: {
    fontSize:15,
    height:20,
    color: 'white',
    textAlign:'center' },
  LogoInformationText: {
    fontSize:30,
    height:60,
    color:'white',
    textAlign: 'center' },

    modal: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',   
    },
});

module.exports = LoginPage;

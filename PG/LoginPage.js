
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
}= React;

var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome')

class LoginPage extends Component {

 constructor(props) {
    super(props);
    this.state ={
      value: {
        username: null,
        password: null
      }
    };
  }
  
  render() {
    return (
		<View style={styles.container}>
        <View style={styles.ViewTitle}>
          <Text style={styles.TitleText}>
            DL-移动系统
          </Text>
        </View>
        <View style={styles.ViewBorder}>
          <View style={styles.ViewAccount}>
          <Icon name='user' size={20} color='#142EB6' style={{margin:7}} />  
            <View style={styles.AccountView}>
                <TextInput underlineColorAndroid='transparent' style={styles.AccountTextInput} placeholder='请输入您的账户' onChangeText={(text) => this.setState({username:text})}/>  
            </View>
          </View>

          <View style={styles.ViewPassword}>
          <Icon name='lock' size={20} color='#142EB6' style={{margin:7}} />
            <View style={styles.PasswordView}>
               <TextInput underlineColorAndroid='transparent' style={styles.PasswordTextInput} placeholder='请输入您的密码'  onChangeText={(text) => this.setState({password:text})} secureTextEntry={true} keyboardType='numeric'/>  
            </View>
          </View>
        </View>
        <TouchableHighlight   underlayColor='#ffcc00' onPress={this.gotoNext.bind(this)} style={styles.buttonview} >
          <Text style={styles.logintext}>登 陆</Text>
        </TouchableHighlight>
        <View style={styles.ViewInformation}>
            <View style={styles.InformationView}>
              <Text style={styles.VersionInformationText}>系统版本：1.0</Text>
              <Text style={styles.PhotoInformationText}>客服电话：021-56511271</Text>
              <Text style={styles.LogoInformationText}>DUTCH LADY</Text>
            </View>
        </View>   
      </View> 
    );
  }
 
  gotoNext() {
  	var url = DataAPI.login;
  	
  	if(!this.state.username||this.state.username.length==0){
  		alert('请输入账户！');
  		return;
  	}
  	
  	if(!this.state.password||this.state.password.length==0){
  		alert('请输入密码！');
  		return;
  	}
  	
   var loginUserName = this.state.username;
   var password = this.state.password;
  
   fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
         mobileKey:'epos',
         osType:'ios',
         version:DataAPI.sysVersion,
        loginUserName:loginUserName,
        password: password,
    })
	}).then(res => res.json())
	 .then(res => this.processLoginData(res));
  }
  
  processStorageData(res){
	AsyncStorage.setItem(DataKEY.USER_ROLE_ID, res.roleId.toString());
	AsyncStorage.setItem(DataKEY.USER_REAL_NAME, res.realName);

	AsyncStorage.setItem(DataKEY.USER_NAME, res.loginUserName);
 
	AsyncStorage.setItem(DataKEY.USER_ID, res.id.toString());
	AsyncStorage.setItem(DataKEY.USER_STORE_CODE, res.storeCode);



	
  }
  
processLoginData(res){
  	if(!res.succ){
  		alert(res.msg);
  		return;
  	}
  	 this.checkForUpdate(res);     	
  }

checkForUpdate(res) 
{
  var version=res.version;
  var SYS_VER=DataAPI.sysVersion;
  var upadteURL=res.updateUrl;
  if (SYS_VER!==version) {
Alert.alert('更新提醒','请更新到最新版本！',[{text:'立即更新', onPress:() => Linking.openURL(upadteURL)}]);
  }
  else
  {
   
    //this.stepMainPageEP(); 
    this.processStorageData(res); 
   var mainpage = null;
  if(res.roleId.toString()==='6'){
    this.stepMainPageEP(); 
  }
  else{
    alert('请输入正确帐号或密码!');
     }   
    }
 }
stepMainPageEP (){
    this.props.navigator.push({
    id:'MainPageEP',
    name: '主页',
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
        color: '#dcdcdc',  
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
});

module.exports = LoginPage;

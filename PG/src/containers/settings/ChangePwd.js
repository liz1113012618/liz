/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, Text,TextInput, View, TouchableHighlight,ListView ,Alert,AsyncStorage} = React;
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var NavigationBar = require('react-native-navbar');
var Icon = require('react-native-vector-icons/FontAwesome');
import Modal from 'react-native-root-modal';
var GiftedSpinner = require('react-native-gifted-spinner');


var ChangePwd = React.createClass({
  PasswordLitmit() {
    var pass=this.state.pwd1;
    if (!pass) {
      this.setState({visible:false});
        Alert.alert('错误提醒','请输入密码', [{text: '确定'}]);
        return false ;
    }
    
    if (pass.length!==6) {
        Alert.alert('错误提醒','请输入6位密码', [{text: '确定'}]);
        return false ;
      } 
      return true;
    },

  onPress: function () {
    if(this.PasswordLitmit())
    {
    	if(!this.state.pwd1){
    		Alert.alert('错误提醒','请输入新的密码', [{text: '确定'}]);
    		return ;
    	}
    	
    	if(!this.state.pwd2){
    		Alert.alert('错误提醒','请再次输入新密码', [{text: '确定'}]);
    		return ;
    	}
    	
    	if(this.state.pwd2!=this.state.pwd1){
    		Alert.alert('错误提醒','两次输入密码不一致', [{text: '确定'}]);
    		return ;
    	}
      this.setState({visible:true});
    	this.submitPwd();
    }
  },
  
  async submitPwd(){
    this.setState({visible:true});
	var url = DataAPI.change_pwd;
	var id = await AsyncStorage.getItem(DataKEY.USER_ID);
  	fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    	id: id,
    	password: this.state.pwd1,
    })
	}).then(res => res.json())
	 .then(res => this.processSubmitSucc(res));
  },
	
  processSubmitSucc(res){
    this.setState({visible:false});
  		if(!res.succ){
  			Alert.alert('温馨提醒',res.msg);
  			return;
  		}
  		
  		Alert.alert('成功提醒','密码修改成功', [{text: '确定'}]);
  		this.props.navigator.pop();
  },

  getInitialState() {
        return {
            pwd1: null,
            pwd2: null,
            visible: false,
        }
  },

  render: function() {
     const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
    return (
    	<View style={styles.container}>
			<NavigationBar
      style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>密码修改</Text></View>}
        leftButton={leftButtonConfig}/>
                          
            
            <TouchableHighlight underlayColor={'#f3f3f2'}>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>					
										
						<View style={styles.rowDetailsContainer}>
							<TextInput style={{height:44}} placeholder='请输入新的密码' maxLength={6} onChangeText={(text) => this.setState({pwd1:text})}
							secureTextEntry={true} keyboardType='numeric'/>
						</View>
					</View>
					<View style={styles.separator} />	
				</View>
			</TouchableHighlight>
			
			<TouchableHighlight underlayColor={'#f3f3f2'}>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>					
										
						<View style={styles.rowDetailsContainer}>
							<TextInput style={{height:44,borderColor:'gray',borderWidth:1}} placeholder='再次输入新密码'
              maxLength={6} onChangeText={(text) => this.setState({pwd2:text})}
							secureTextEntry={true} keyboardType='numeric'/>
						</View>
					</View>
					<View style={styles.separator} />	
				</View>
			</TouchableHighlight>
            
			
			<View style={styles.bottomview}>  
				 <Icon.Button name="save" backgroundColor="orange" onPress={this.onPress}>
				    <Text style={{fontFamily: 'Arial',color:'white', fontSize: 15}}>确认提交</Text>
				 </Icon.Button>
			</View>
      <Modal style={styles.modal} visible={this.state.visible} >            
            <GiftedSpinner/>
        </Modal>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {  
        flex: 1,  
        backgroundColor: '#FFFFFF'  
    },
      navigationBar: {
      backgroundColor:'#142EB6'
    },  
	header: {  
        height: 50,  		
        justifyContent: 'center',  
		backgroundColor: '#142EB6' ,
		alignItems: 'center',  
    },  
    headtitle: {  
        fontSize: 17,  
        color: '#FFFFFF',  
        marginTop: 10,  
        marginBottom: 10,  
    }, 	
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
   textinput: {  
        flex: 1,  
        fontSize: 14,
        borderColor: '#142EB6',
    	borderWidth: 1,
    },
    
   buttonview: {  
        backgroundColor: '#142EB6',  
        margin: 10,  
        borderRadius: 6,  
        justifyContent: 'center',  
        alignItems: 'center',  
    },
    
   inputview: {  
        height: 120,  
    }, 
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

module.exports = ChangePwd;

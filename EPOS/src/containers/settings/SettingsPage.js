/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, Text, View, TouchableHighlight,TextInput,AsyncStorage, } = React;
var Icon = require('react-native-vector-icons/FontAwesome');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var NavigationBar = require('react-native-navbar');
var SettingsPage = React.createClass({
 async componentDidMount() {
    var USER_REAL_NAME = await AsyncStorage.getItem(DataKEY.USER_REAL_NAME);
    var USER_NAME = await AsyncStorage.getItem(DataKEY.USER_NAME);
   this.setState({USER_REAL_NAME:USER_REAL_NAME,USER_NAME:USER_NAME,});
 },
  getInitialState:function() {
    return {
        USER_REAL_NAME:'',
        SER_NAME:'',

    };
  },

  gotoChangePwd: function () {
	this.props.navigator.push({
      id: 'ChangePwd',
      title: '密码变更',
    });
  },
  
   gotoAboutUs: function () {
	this.props.navigator.push({
      id: 'AboutUs',
      title: '关于我们',
    });
  },
  
  gotoLogin: function(){
  	//this.props.navigator.popToTop();
    this.props.navigator.resetTo({
      id:'LoginPage',
    });
  },

  render: function() {
    return (
    	<View style={styles.container}>
		  <NavigationBar
      style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>设置</Text></View>}/>

      <TouchableHighlight underlayColor={'white'} >
        <View style={{flex:1,alignItems:'center',flexDirection:'row',height:25,}}>
              <Text style={{fontSize: 15,alignSelf:'center',  color: 'gray',marginLeft:38,}}>
               姓  名:
              </Text>
              <Text style={{ fontSize: 13,alignSelf:'center',color: 'gray',marginLeft:10,}}>
              {this.state.USER_REAL_NAME}
            </Text>             
        </View>
      </TouchableHighlight>

       <TouchableHighlight underlayColor={'white'} >
        <View style={{flex:1,alignItems:'center',flexDirection:'row',height:25,}}>
              <Text style={{fontSize: 15,alignSelf:'center',  color: 'gray',marginLeft:30,}}>
               账号名:
              </Text>
              <Text style={{ fontSize: 13,alignSelf:'center',color: 'gray',marginLeft:10,}}>
              {this.state.USER_NAME}
            </Text>             
        </View>
      </TouchableHighlight>

       <TouchableHighlight underlayColor={'white'} >
        <View style={{flex:1,alignItems:'center',flexDirection:'row',height:25,borderBottomWidth:1,borderColor:'gray'}}>
              <Text style={{fontSize: 15,alignSelf:'center',  color: 'gray',marginLeft:38,}}>
               职  位:
              </Text>
              <Text style={{ fontSize: 13,alignSelf:'center',color: 'gray',marginLeft:10,}}>
              EPOS
            </Text>             
        </View>
      </TouchableHighlight>
	       
	       <TouchableHighlight underlayColor={'#f3f3f2'} onPress={() => this.gotoChangePwd()}>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowCount}>
							<Icon name='expeditedssl' size={30} color='brown' />
						</Text>
						<View style={styles.rowDetailsContainer}>
							<Text style={styles.rowTitle}>
								密码变更
							</Text>
							<Text style={styles.rowDetailsLine}>
								点击进入变更您的登录密码
							</Text>
						</View>
						<Text style={styles.rowCount}>
							<Icon name='angle-right' size={15} color='gray' />
						</Text>				
					</View>
					<View style={styles.separator} />	
				</View>
			</TouchableHighlight>
			
			<TouchableHighlight underlayColor={'#f3f3f2'} >
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowCount}>
							<Icon name='anchor' size={30} color='cornflowerblue' />
						</Text>
						<View style={styles.rowDetailsContainer}>
							<Text style={styles.rowTitle}>
								关于我们
							</Text>
							<Text style={styles.rowDetailsLine}>
								点击进入关于系统支持信息
							</Text>						
						</View>	
						<Text style={styles.rowCount}>
							<Icon name='angle-right' size={15} color='gray' />
						</Text>						
					</View>
					<View style={styles.separator} />	
				</View>
			</TouchableHighlight>
	       
			<View style={styles.bottomview}>  
				 <Icon.Button name="close" backgroundColor="orange" onPress={() => this.gotoLogin()}>
				    <Text style={{fontFamily: 'Arial',color:'white', fontSize: 15}}>退出登录</Text>
				 </Icon.Button>
			</View>
			
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
   
   rowCl:{
        flex: 1,
        flexDirection: 'column',
    },
    
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowCount: {
        fontSize: 13,
        textAlign: 'right',
        color: 'gray',
        margin: 10,
        marginLeft: 15,
    },
    rowDetailsContainer: {
        flex: 1,
    },
    rowTitle: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 4,
        marginRight: 10,
        color: '#FF6600'
    },
    rowDetailsLine: {
        fontSize: 12,
        marginBottom: 10,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray'
    },
    
     bottomview: {  
        backgroundColor: '#ECEDF1',  
        margin: 10,
    }, 
    
    buttonview: {  
        backgroundColor: '#142EB6',  
        margin: 10,  
        borderRadius: 6,  
        justifyContent: 'center',  
        alignItems: 'center',  
    },
     buttontext: {  
        fontSize: 17,  
        color: '#FFFFFF',  
        marginTop: 10,  
        marginBottom: 10,  
    }, 
});

module.exports = SettingsPage;

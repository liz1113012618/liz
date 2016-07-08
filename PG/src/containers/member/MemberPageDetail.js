/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Linking,
  Alert,
 
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome')


var MemberPageDetail = React.createClass({
 

	getInitialState: function() {

	  return {
	   
	   };
	},
  
secrecty:function(string,n) {
  if (string) {
 var str=string;
  var sdStr=str.substr(0,n);
   for (var i = 0; i < str.length-n; i++) {
         sdStr=sdStr+'*';
   };
     return sdStr;
   }

 },  
 telephone:function() {
  var telString='tel:'+this.props.message.phone;
   Linking.canOpenURL('tel:10086').then(supported =>{
    if (!supported) {
      Alert.alert('温馨提醒','此设备不支持拨打电话功能',[{text:'确定',}]);
    }
    else {
      return Linking.openURL(telString);
    }
   }).catch(err =>console.error('An error ocurred',err));
 },

	render: function() {
     var Name=this.secrecty(this.props.message.parentName,1);
    var Phone=this.secrecty(this.props.message.phone,3);
		const leftButtonConfig = {
    title: '返回',
    tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
		let title= '会员建议';
		let header = 
		 <NavigationBar
		 style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{title}</Text></View>}
         leftButton={leftButtonConfig}/>
		return (
		
		<View style={styles.container}>
      <NavigationBar
      style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>会员建议</Text></View>}
        leftButton={leftButtonConfig}/>

        <View style={styles.rowCl}>
          <View style={styles.rowContainer}>          
            <Text style={styles.rowCount}>家长姓名:</Text>
            <View style={styles.rowDetailsContainer}>
              <Text style={styles.Textstyle}>{Name}</Text>
            </View>
          </View>
          <View style={styles.separator} /> 
        </View>
     
        <View style={styles.rowCl}>
          <View style={styles.rowContainer}>          
            <Text style={styles.rowCount}>类型:</Text>          
            <View style={styles.rowDetailsContainer}>
              <Text style={styles.Textstyle}>{this.props.message.type}</Text>
            </View> 
          </View>
          <View style={styles.separator} /> 
        </View>
      
        <View style={styles.rowCl}>
          <View style={styles.rowContainer}>          
            <Text style={styles.rowCount}>手机号码:</Text>          
            <View ><Text style={styles.Textstyle}>{Phone}</Text></View>               
          </View>
          <View style={styles.separator} /> 
        </View>
      
        
        <View style={{height:270}}></View>
 
      <TouchableHighlight underlayColor={'#f3f3f2'} onPress={()=>this.telephone()} >
        <View style={styles.rowCl2}> 
          <View style={styles.rowContainer}>  
          <Text style={[styles.rowCount,{textAlign:'center'}]}><Icon name='phone' size={15} color='white' /></Text>        
            <Text style={{ fontSize: 13,textAlign: 'center', color: 'white', margin: 5, width:60,}}>拨打电话</Text>  
          </View> 
        </View>
      </TouchableHighlight>

      </View>
		); 
	},	

});

const styles = StyleSheet.create({
  container: {  
        flex: 1,  
        backgroundColor: '#f3f3f2'  
    },

   navigationBar: {
      backgroundColor:'#142EB6',
    },  
    rowCl:{
        height:44,
        flexDirection: 'column',
        backgroundColor:'#f3f3f2',
    }, 
     rowContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height:44
    }, 
    rowCount: {
        fontSize: 13,
        textAlign: 'right',
        color: 'gray',
        width:60,
    },
    rowDetailsContainer: {
        flex: 1,
    },
   rowCl2:{
       flex:1,
        flexDirection: 'column',    
        backgroundColor:'#142EB6',
        borderRadius:5,
        margin:10,

    },  
    
    separator: {
        height: 1,
        backgroundColor: 'gray'
    }, 
    Textstyle:{
    color:'gray', 
    fontSize: 15,
     textAlign: 'left',
     margin:2,
   },
    
});

module.exports = MemberPageDetail;

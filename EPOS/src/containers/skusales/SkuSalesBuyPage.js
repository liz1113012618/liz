/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, Text,View, TouchableHighlight,WebView} = React;
var Icon = require('react-native-vector-icons/FontAwesome')
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');

var SkuSalesBuyPage = React.createClass({
 getInitialState(){
  var str=this.props.message;
  var obj = eval('(' + str + ')');

  return {
     message:obj,
  }
 
 },
  stepSkuSalesBuyDetail:function() {
     var customer=this.props.message;
     var obj = eval('(' + customer + ')');
    this.props.navigator.push({
      id:'SkuSalesBuyDetail',
      customerId:obj.customerId,
    });
  },
  
    dateShow:function(message){
    var s=message.etc;
    var ss = s.substring(0, 10);
   return (ss);

  },
    render: function() {
     var message=this.state.message;
     
        const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
 
	   return(
      <View style={styles.container}>
      <NavigationBar
      style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}></Text></View>}
        leftButton={leftButtonConfig}/>

        <View style={styles.rowCl}>
          <View style={styles.rowContainer}>          
            <Text style={styles.rowCount}>手机号码:</Text>
            <View style={styles.rowDetailsContainer}>
              <Text style={styles.Textstyle}>{message.phone}</Text>
            </View>
          </View>
          <View style={styles.separator} /> 
        </View>
     
        <View style={styles.rowCl}>
          <View style={styles.rowContainer}>          
            <Text style={styles.rowCount}>家长姓名:</Text>          
            <View style={styles.rowDetailsContainer}>
              <Text style={styles.Textstyle}>{message.parentName}</Text>
            </View> 
          </View>
          <View style={styles.separator} /> 
        </View>
      
        <View style={styles.rowCl}>
          <View style={styles.rowContainer}>          
            <Text style={styles.rowCount}>宝宝生日:</Text>          
            <View ><Text style={{color:'gray', fontSize: 13, textAlign: 'right',margin:15}} numberOfLines={1}>{this.dateShow(message)}</Text></View>               
          </View>
          <View style={styles.separator} /> 
        </View>
      
        
        <View style={{height:270}}></View>
 
      <TouchableHighlight underlayColor={'#f3f3f2'} onPress={() => this.stepSkuSalesBuyDetail()}>
        <View style={styles.rowCl2}> 
          <View style={styles.rowContainer}>          
            <Text style={{ fontSize: 13,textAlign: 'right', color: 'white', margin: 5, width:60,}}>扫码出货</Text>
            <View style={styles.rowDetailsContainer}><Text style={{color:'white'}}>(点击扫描)</Text></View>
           
          </View> 
        </View>
      </TouchableHighlight>

      </View>
      );
    },
 
 
});

var styles = StyleSheet.create({
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
module.exports = SkuSalesBuyPage;

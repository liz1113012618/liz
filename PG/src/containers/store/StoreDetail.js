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
  WebView
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var StoreDetail = require('./StoreDetail');
var Icon = require('react-native-vector-icons/FontAwesome')

var StoreDetail = React.createClass({

  render: function(){
     const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
    var storeItem = this.props.storeItem;
    var url = DataAPI.store_arravie_detail+"?code="+storeItem.code;
    return (
       <View style={styles.container}>
           <NavigationBar
          style={styles.navigationBar}
        title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{this.props.title}</Text></View>}
        leftButton={leftButtonConfig}/>
                          
           <View style={styles.headerContainer}>
		      <Text style={styles.headerTitle}>
		        {this.props.storeItem.code} | {this.props.storeItem.name}
		      </Text>
		      <Text style={styles.headerPostDetailsLine}>
		        {this.props.storeItem.address} 
		      </Text>
		      
		      <View style={styles.separator}/>
		       <Text style={styles.headerPostDetailsLine}>
		       			{this.props.storeItem.linkMan} | {this.props.storeItem.phone} 
		      </Text>
		      
		      <View style={styles.separator}/>
		      
		      <WebView style={{  height: 100, }} 
		      	 source={{uri: url}} scalesPageToFit={true} automaticallyAdjustContentInsets={false} javaScriptEnabled={true} />
		     
		  </View>
       </View>
    );
  }

});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF'
    },
     navigationBar: {
      backgroundColor:'#142EB6',
    },  
  headerContainer: {
    flex:1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
    paddingRight: 10,
    paddingLeft: 10,
  },
  headerTitle:{
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    color: '#FF6600',
  },
  headerPostText:{
    fontSize: 14,
    marginBottom: 3,
  },
  headerSourceLabel:{
    fontSize: 15,
    textAlign: 'left',
    color: '#0089FF',
    paddingBottom: 10,
  },
  headerPostDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  headerCommentTitle: {
    color: 'gray',
    marginTop: 10
  },

});

module.exports = StoreDetail;

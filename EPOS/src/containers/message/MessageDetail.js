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
  WebView,
  AsyncStorage,
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome')

var MessageDetail = React.createClass({
 async componentDidMount() {

   
    var str=this.props.message.type;
 
    var Type=eval('(' + str + ')');

      if (Type==0) {
       var Mes=this.props.message;
      var id = await AsyncStorage.getItem(DataKEY.USER_ID); 
     var  msgid = Mes.msgId;   
        var api = DataAPI.message_submit+'?userId='+id+"&msgId="+msgid ;
       
        fetch(api)
         .then(res => res.json())
         .then(res => this.messageSubmit(res)); 
      }
  },
   messageSubmit:function(res) {
    var user=1;
    if (!res.succ) {
      Alert.alert('温馨提醒',res.msg);
    }
   
   
   },

  render: function(){
     const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
    var message = this.props.message;
    return (
       <View style={styles.container}>
          <NavigationBar
          style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{this.props.title}</Text></View>}
        leftButton={leftButtonConfig}/>
                          
           <View style={styles.headerContainer}>
		      <Text style={styles.headerTitle}>
		        {this.props.message.title}
		      </Text>
		      <Text style={styles.headerPostDetailsLine}>
		        {this.props.message.send_time} 
		      </Text>
		      <View style={styles.separator}/>
		      
		      	<WebView style={{ backgroundColor: '#FFFFFF', height: 100, }} 
		      	source={{html: this.props.message.content}} scalesPageToFit={true} />
		     
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

module.exports = MessageDetail;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
    AppRegistry,
    Component,
    StyleSheet,
    PropTypes,
    Text,
    View,
    WebView,
    Image,
    TouchableHighlight,
    TouchableOpacity,
     AsyncStorage,
     Alert,
}= React;
var NavigationBar = require('react-native-navbar');
import Modal from 'react-native-root-modal';
var DataKEY = require('../../utils/DataKEY');
var DataAPI = require('../../utils/DataAPI');
var dismissKeyboard = require('dismissKeyboard');


var HomePageEP =React.createClass ({
  dismiss:function() {
    dismissKeyboard();
  },

   getInitialState:function() {
    return {
      visible: false,
      URL:'', 
      count:0, 
      message:'', 
      data:'',
    };
   },
  async nextMessage() {
    var Mes=this.state.message;
    var id = await AsyncStorage.getItem(DataKEY.USER_ID); 
     var  msgid = Mes.msgId;   
        var api = DataAPI.message_submit+'?userId='+id+"&msgId="+msgid ;
        fetch(api)
         .then(res => res.json())
         .then(res => this.messageSubmit(res)); 
   },
   messageSubmit:function(res) {
    if (!res.succ) {
      Alert.alert('温馨提醒',res.msg);
    }
    else {
       var countNext=this.state.count;
    countNext=countNext+1;
    this.setState({count:countNext});
    this.updateDataSource();
    }
   },

   async componentDidMount() {
           this.dismiss;
        var id = await AsyncStorage.getItem(DataKEY.USER_ID);
          var storeCode = await AsyncStorage.getItem(DataKEY.USER_STORE_CODE);
          var HOMEURL = DataAPI.home_list_ep+'?id='+id+"&code="+storeCode ;
           this.setState({URL:HOMEURL});

        var api = DataAPI.messages_list+'?id='+id;
        fetch(api)
         .then(res => res.json())
         .then(res => this.updateData(res));
    },
   updateData:function(res) {
    this.setState({data:res});
    this.updateDataSource();
   },

    updateDataSource: function(){
      var data=this.state.data;
       var countI=this.state.count;
      var mes=data[countI];
      if (countI>=0 && countI<data.length) {
        this.setState({
          visible:true,
          message:mes,
        });
      }
      else{
        this.setState({visible:false});
      }
    
    },

 render() {
   	 var url = this.state.URL;
     var Message=this.state.message;
	 	return (
	        <View style={styles.container}>
	        	<View style={{height:44,marginTop:20,backgroundColor:'#142EB6',alignItems:'center',justifyContent:'center'}}><Text style={{color:'white',textAlign:'center',fontSize:17,letterSpacing:0.5}}>首页</Text></View>
		    	<WebView ref={'webview'}  source={{uri: url}}  automaticallyAdjustContentInsets={false} javaScriptEnabled={true} />

           <Modal
                style={styles.modal}
                visible={this.state.visible}>
                
            <View style={styles.modalContainer}>
                <View style={{height:30,justifyContent:'center'}}>
                    <Text style={styles.text}>{Message.title}</Text>
                     <Text style={styles.text}>{Message.send_time}</Text>
                </View>
                <View style={styles.container}>       
                    <WebView style={{ backgroundColor: '#FFFFFF', height: 100, }} 
            source={{html: Message.content}} scalesPageToFit={true} />
        
                </View>
                 <TouchableHighlight
                    style={[styles.button, styles.closeLeft]}
                    underlayColor="#aaa"
                    onPress={this.nextMessage}>
                    <Text style={styles.text}>下一条</Text>
                </TouchableHighlight>
            </View>

             

            </Modal>
          

		    </View>
	   );
	 }
});

const styles = StyleSheet.create({
  	container: {
	    flex: 1,
	    backgroundColor: 'transparent'
  	},
     
	header: {  
        height: 50,  
        borderColor: 'red',
        borderWidth :0.5,
        alignItems : 'center',	 
		backgroundColor: '#142EB6' ,
    },  
    headtitle: {  
        fontSize: 17,  
        color: '#FFFFFF',  
        marginTop: 10,  
        marginBottom: 10,  
    }, 
    
    menuleft: {  
       alignSelf: 'flex-start' , 
    },
    
    menuright: {  
       alignSelf: 'flex-end',  
    },
    modal: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
       justifyContent:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        
       
    },
    
    closeLeft: {
        position: 'absolute',
        width: 60,
        height: 30,
        borderRadius: 5,
       justifyContent:'center',
        left: 100,
        bottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        height: 250,
        width: 250,
        alignSelf:'center',
        

        backgroundColor: 'blue',
        borderRadius:10,
        overflow:'hidden',


    },
    text: {
        color: 'white',
        alignSelf:'center',
        fontSize:12,
    },
    close:{
      position:'absolute',
      top:280,
      right:150,
    },
    
	
});

module.exports = HomePageEP;



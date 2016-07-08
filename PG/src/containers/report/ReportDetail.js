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
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
import Modal from 'react-native-root-modal';
var GiftedSpinner = require('react-native-gifted-spinner');



var ReportDetail =React.createClass ({
   async componentDidMount() {
     var message = this.props.message;
     var name = await AsyncStorage.getItem(DataKEY.USER_NAME);
     var storeCode= await AsyncStorage.getItem(DataKEY.USER_STORE_CODE);
     var url;
     if (this.props.rowID<3) {
      url = DataAPI.BaseURL+message.url+'?name='+storeCode;
     }
     else{
       url = DataAPI.BaseURL+message.url+'?name='+name;   
     }
     
    this.setState({URL:url});
  },
  componentWillUnmount() {
      // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
    },
  getInitialState: function() {
    return {
      visible: false,
      URL:'',
     };
  },

	 render() {
	 	  const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
         
	 	return (
	        <View style={styles.container}>
	           <NavigationBar
          style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{this.props.title}</Text></View>}
        leftButton={leftButtonConfig}/>
		    	<WebView ref={'webview'}  source={{uri: this.state.URL}}  automaticallyAdjustContentInsets={false} javaScriptEnabled={true} />
          <Modal style={styles.modal} visible={this.state.visible} >            
                 <GiftedSpinner/>
           </Modal>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',   
    },

	
});

module.exports = ReportDetail;

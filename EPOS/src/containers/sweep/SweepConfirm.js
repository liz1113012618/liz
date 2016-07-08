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
  AsyncStorage,
  Alert,
  Dimensions
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome')
var GiftedSpinner = require('react-native-gifted-spinner');
import Modal from 'react-native-root-modal';



var SweepConfirm = React.createClass({

	
	getInitialState: function() {
	  return {
	    dataSource: new ListView.DataSource({
	      rowHasChanged: (r1, r2) => r1 !== r2
	    }),
      visible:false,
	   
	   };
	},
 componentDidMount() {
  var data=this.props.message.data;
  //alert(this.props.scaneData);
  this.setState({
    dataSource:this.state.dataSource.cloneWithRows(data)
  });
 },


  Really:function(){
   this.AlertSubmit();
  },
   AlertSubmit:function(){
     Alert.alert('提交提醒','确定要提交选择的样品码？', [
              {text: '取消', onPress: () => console.log('Cancel Pressed!')},
              {text: '确定', onPress: () => this.processDataSubmit()},
        ]);
  },
  async processDataSubmit(){
     this.setState({visible:true});
      var url = DataAPI.sample_submit;
      var storeCode = await AsyncStorage.getItem(DataKEY.USER_STORE_CODE);
      var pgCode = await AsyncStorage.getItem(DataKEY.USER_NAME);
      var userId = await AsyncStorage.getItem(DataKEY.USER_ID);
      
      
      fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pgCode: pgCode,
        storeCode: storeCode,
         userId:userId,
        scaneData: this.props.scaneData,  
        order_id:this.props.Order.order_id,
        dc_order:this.props.Order.dc_order,
              
      })
    }).then(res => res.json())
      .then(res => this.processSubmitSucc(res));
    },
      processSubmitSucc: function(res){
        this.setState({visible:false});
        if(!res.succ){
        Alert.alert('错误提醒',res.msg);
        return;
      }
      else {
         this.props.navigator.popToRoute(this.props.navigator.getCurrentRoutes()[2]);    
      }
      
  },
 
	render: function() {
    const leftButtonConfig={
      title:'返回',
      tintColor:'white',
      handler:()=>this.props.navigator.pop(),
    };
		let title= '样品收货';
		let header = 
		 <NavigationBar
		 style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{title}</Text></View>}
         leftButton={leftButtonConfig}/>
		return (
			<View style={styles.container}>
				{header}
        <View style={{height:40,borderBottomWidth:1,borderColor:'gray',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <View style={[styles.productName,{marginLeft:0,width:Dimensions.get('window').width/2-10}]}>
            <Text style={styles.productText}>产品名称</Text>
          </View>
          <View style={styles.productName}>
            <Text style={styles.productText}>应收(罐/盒)</Text>
          </View>
           <View style={[styles.productName,{marginRight:0}]}>
            <Text style={styles.productText}>实收(罐/盒)</Text>
          </View>
        </View>
			<ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow }  />

      <TouchableHighlight onPress={()=>this.Really()}>
        <View style={styles.Acceipt}>
          <Text style={{fontSize:15,textAlign:'center',color:'white'}}>提交</Text>
       </View>
      </TouchableHighlight>

      <Modal style={styles.modal} visible={this.state.visible}>
        <GiftedSpinner/>
      </Modal>

			</View>
		); 
	},
	
	messageDetail: function (message){
	   	
	},

	renderRow: function(message) {
		return (		  
			<TouchableHighlight underlayColor={'#f3f3f2'} onPress={ this.messageDetail.bind(this, message) }>
      <View style={{height:40,borderBottomWidth:1,borderColor:'gray',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <View style={[styles.productName,{marginLeft:0,width:Dimensions.get('window').width/2-10}]}>
            <Text style={[styles.productText,{textAlign:'left'}]}>{message.sku_name}</Text>
          </View>
          <View style={styles.productName}>
            <Text style={styles.productText}>{message.receivable}</Text>
          </View>
           <View style={[styles.productName,{marginRight:0}]}>
            <Text style={styles.productText}>{message.total}</Text>
          </View>
        </View>
			</TouchableHighlight>
			  
		);
	},

});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF'
    },
   navigationBar: {
      backgroundColor:'#142EB6',
    },
    productName:{
      height:40,
      width:Dimensions.get('window').width/4+5,
      alignItems:'center',
      justifyContent:'center'
    },
    productText:{
      fontSize:15,
      textAlign:'center',
      color:'black',
    },
    rowCl:{
        flex: 1,
        flexDirection: 'column',
    },
    
    rowContainer:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'gray',
        marginLeft:10,
        
        
    },
    rowBK:{
      height:40,
      width:120,
      alignItems:'center',
      justifyContent:'center',
      borderRightWidth:1,
      borderColor:'gray',
      marginLeft:10,
     

    },
   
    rowCount: {
        fontSize: 15,
        textAlign: 'left',
        marginLeft:10,
        color: 'gray',
       
    },
   
    rowDetailsContainer: {
        flex: 1,
        flexDirection:'row',

    },
    rowTitle: {
        fontSize: 12,
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
    Acceipt:{
      marginBottom:10,
      marginLeft:10,
      marginRight:10,
      borderRadius: 8,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#142EB6',
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

module.exports = SweepConfirm;

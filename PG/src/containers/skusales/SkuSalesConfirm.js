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
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome')
var GiftedSpinner = require('react-native-gifted-spinner');
import Modal from 'react-native-root-modal';



var SkuSalesConfirm = React.createClass({

	
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
     Alert.alert('提交提醒','确定要执行该操作？', [
              {text: '取消', onPress: () => console.log('Cancel Pressed!')},
              {text: '确定', onPress: () => this.processDataSubmit()},
        ]);
  },
  async processDataSubmit(){
     this.setState({visible:true});
      var url = DataAPI.customer_submit_saleout;

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
         customerId:this.props.customerId,
              
      })
    }).then(res => res.json())
      .then(res => this.processSubmitSucc(res));
    },
      processSubmitSucc: function(res){
       this.setState({visible:false});
        if(!res.succ){
     Alert.alert('温馨提醒',res.msg);
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
		let title= '扫码出货';
		let header = 
		 <NavigationBar
		 style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{title}</Text></View>}
         leftButton={leftButtonConfig}/>
		return (
			<View style={styles.container}>
				{header}
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
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowCount}>
						{message.sku_name}
						</Text>
						<View style={styles.rowDetailsContainer}>
							<Text style={styles.rowTitle}>	
							</Text>
							<Text style={styles.rowDetailsLine}>
							</Text>
						</View>
						<Text style={styles.rowCount}>
						    {message.total}罐
						</Text>
					</View>
					<View style={styles.separator} />	
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
        fontSize: 12,
        textAlign: 'right',
        color: 'gray',
        margin: 10,
        marginLeft: 15,
    },
    rowDetailsContainer: {
        flex: 1,
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

module.exports = SkuSalesConfirm;

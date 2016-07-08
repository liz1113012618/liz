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
  Alert,
  WebView,
  AsyncStorage,
  ToastAndroid,AsyncStorage
}= React;
import Modal from 'react-native-root-modal';
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome')

var HomePagePG = React.createClass({
 getInitialState: function() {
    return {
    visible:  false,
     data:'',
      URL:'', 
      count:0, 
      message:'',  
		btnTitles : ['在岗','扫码出货'],
		btnColor : ['#a9a9a9','#D68DEE'],
		btnIcon : ['map-marker','users'],
    workColor:['#a9a9a9','red'],
		workStatusTitle:['下班','上班'],
		workStatus: 0,
  
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
        var id = await AsyncStorage.getItem(DataKEY.USER_ID);
          var storeCode = await AsyncStorage.getItem(DataKEY.USER_NAME);

           var isworkstring= await AsyncStorage.getItem(DataKEY.USER_REM_ISWORK);   
           var defaultstartFlag=0;
          var iswork = eval('(' + isworkstring + ')');
           if (iswork) {
                 defaultstartFlag=1;
           }
           else{
            defaultstartFlag=0;
           }
          var HOMEURL = DataAPI.home_list_pg+'?id='+id+"&code="+storeCode ;
           this.setState({
            URL:HOMEURL,
            workStatus:defaultstartFlag,
          });
          
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
        var Message=this.state.message;
      var mes=data[countI];
      if (countI>=0 && countI<data.length) {
        this.setState({
          visible:true,
          message:mes});
      }
      else{
        this.setState({visible:false});
      }
     
    },
  render: function(){
  	var url = this.state.URL;
    var Message=this.state.message;
	let header = <NavigationBar
             style={styles.navigationBar}
             title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>首页</Text></View>} / >         
    return (
       <View style={styles.container}>
         
           <View style={styles.headerContainer}>
		      {header}
		      <View style={styles.headView}>
			      {this._renderWrokStatus()}
			      {this._renderSalesBtn('扫码出货')}
		      </View>
		     
		      <View style={styles.separator}/>
		      	<WebView style={{  height: 600, }} 
		      	 source={{uri: url}} scalesPageToFit={true} automaticallyAdjustContentInsets={false} javaScriptEnabled={true} />
           </View>

             <Modal
                style={styles.modal}
                visible={this.state.visible}>
            <View style={styles.modalContainer}>
                <View style={{height:30,justifyContent:'center'}}>
                    <Text style={styles.text2}>{Message.title}</Text>
                    <Text style={styles.text2}>{Message.send_time}</Text>
                </View>
                <View style={styles.container}>
                    <WebView style={{ backgroundColor: '#FFFFFF', height: 100, }} 
            source={{html: Message.content}} scalesPageToFit={true} />
                </View>

                 <TouchableHighlight
                    style={[styles.button, styles.closeLeft]}
                    underlayColor="#aaa"
                    onPress={this.nextMessage}
                >
                    <Text style={styles.text2}>下一条</Text>
                </TouchableHighlight>
            </View>
            </Modal>
		     
		 
       </View>
    );
  },
  
   _renderWrokStatus: function() {
    return (
      <TouchableHighlight onPress={() => this._getWorkStatus()} underlayColor="transparent">
        <View>
          <View style={{
			justifyContent: 'center',
			padding: 20,
			margin: 5,
			width: 100,
			height: 100,
			alignItems: 'center',
			borderRadius: 5,
		    backgroundColor: this.state.workColor[this.state.workStatus],
		  }} >
			<Icon name={this.state.btnIcon[0]} size={30} color='#ffffff' />
			<Text style={styles.text}>
			  {this.state.workStatusTitle[this.state.workStatus]}
			</Text>
			 
          </View>
        </View>
      </TouchableHighlight>
    );
  },
  
   _renderSalesBtn: function(title: string) {
    return (
      <TouchableHighlight onPress={() => this._pressSalesBtnRow()} underlayColor="transparent">
        <View>
          <View style={{
			justifyContent: 'center',
			padding: 20,
			margin: 5,
			width: 100,
			height: 100,
			alignItems: 'center',
			borderRadius: 5,
		    backgroundColor: this.state.btnColor[1]
		  }} >
			<Icon name={this.state.btnIcon[1]} size={30} color='#ffffff' />
			<Text style={styles.text}>
			  {title}
			</Text>
			 
          </View>
        </View>
      </TouchableHighlight>
    );
  },
  
  async _getWorkStatus(){
   		var url = DataAPI.pg_worktime_detatil;
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
	    })
		}).then(res => res.json())
		 .then(res => this._processWorkStatus(res));
  },
  
   _processWorkStatus(res){
    // var startFlag=1;
    // if (this.state.iswork) {
    //      startFlag= 1;
    // }
    // else{
    //   startFlag= 0;
    // }
    	var startFlag=0;
    	if(res.workType==-1){
  			startFlag= 1;
  		} else{
  			startFlag= 0;
  		}
  		var msg = '确定'+this.state.workStatusTitle[startFlag] +'吗?';
  		Alert.alert('温馨提醒',msg ,[{text:'确认',onPress:()=>this._submitWorkStatus(startFlag,res.id)}, {text:'取消'}]);
    },
  
  async _submitWorkStatus(startFlag,id){
     if (!startFlag) {
      this.setState({btnColor :['#a9a9a9','#D68DEE']});
     }
     else
     {
      this.setState({btnColor:['red','#D68DEE']});
     }
  		
    	var url = DataAPI.pg_worktime_submit;
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
	        workType:startFlag,
	        id:id,
	    })
		}).then(res => res.json())
		 .then(res => this._processSubmitSucc(res,startFlag));
    },
    
    _processSubmitSucc(res,startFlag){
  		var msg = '数据提交成功，当前状态：'+this.state.workStatusTitle[startFlag];
  		Alert.alert('温馨提醒',msg);
  		this.setState({workStatus: startFlag});
    },
   
    _pressSalesBtnRow: function() {
		var companets = 'SkuSalesInputPage';
		this.props.navigator.push({
	      id: companets,
	      title: this.state.btnTitles[1],
	   });
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
  headerContainer: {
    backgroundColor: '#F6F6EF',
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
    list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  headView: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold',
	color: '#FFFFFF'
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
    text2: {
        color: 'white',
        alignSelf:'center',
        fontSize:12,
    }
});

module.exports = HomePagePG;

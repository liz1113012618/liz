/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
//import Camera from 'react-native-camera';
var React = require('react-native');
var { AppRegistry, StyleSheet, Text,TextInput,ListView, View, TouchableHighlight,Alert,AsyncStorage, } = React;
var Icon = require('react-native-vector-icons/FontAwesome')
var DateTimePicker = require('react-native-datetime-picker');
var Button = require('react-native-simple-button');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Validation = require('../../utils/Validation');
var NavigationBar = require('react-native-navbar');

import Modal from 'react-native-root-modal';
var GiftedSpinner = require('react-native-gifted-spinner');
var dismissKeyboard=require('dismissKeyboard');


var SkuSalesInputPage = React.createClass({
  dismiss:function() {
    dismissKeyboard();
  },
  componentWillUnmount() {
    this.dismiss();
  },

  _genRows: function(BarData){
   var dataBlob3=this.state.dataBlob2;
   var code=BarData;
   var Found=true;
   for (var i=0; i<dataBlob3.length;i++) {
    if (dataBlob3[i]==code) {
      Found=false;
      Alert.alert('扫码提醒','该码已存在!',[{text:'确认',onPress:() => console.log('Cancel Pressed!')}]);
      break;
    }
      }
   if (Found) {
    dataBlob3.push(code);
   }
   this.setState({dataBlob2:dataBlob3});
   this.processSubmitDelet();
    return dataBlob3;
  },

   processSubmitDelet:function() {
    var arryCodeData=this.state.dataBlob2;
    var sdstr='';
    for (var i = 0;i<arryCodeData.length ;i++) {

      if (i) {
      sdstr=sdstr+','+arryCodeData[i];
     }
     else{
      sdstr=arryCodeData[i];
     }
   
    }
     this.setState({scaneData:sdstr});
  },

    getInitialState() {
       var ds =new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        return {
          visible: false,
           page:null,
           codeData:null,
           dataSource: ds.cloneWithRows([]),
           dataBlob2:[],
           scaneData:'',
            phone:null,
            parentName: null,
            date: new Date(),
            crif: null, 
            random:null,
            crifSend:null,           
        	newMember:true,
        	memberID:null,
        }
    }, 

 _onBarCodeRead:function(barcode) {
   String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
}
  var e=barcode.data;
  var str =e.substr(e.indexOf('=')+1,e.length);
 var str2=str.trim();
    var BarData=str2;
    
 if (BarData) {
     this.setState({  
      dataSource:this.state.dataSource.cloneWithRows(this._genRows(BarData)),
      codeData:BarData,
      page:null, 
      
     });
  }          
  },
  checkSendVerificationCode:function() {
    this.dismiss();
     var phone =this.state.phone;
      if(!phone){
        Alert.alert('错误提醒','请输入手机号码', [{text: '确定'}]);
        return ;
      }  
      if (phone.length!==11) {
        Alert.alert('错误提醒','请输入11位手机号码', [{text: '确定'}]);
        return ;
      } 
      this.sendVerificationCode();
      return ;
  },
  
  sendVerificationCode:function() {
    this.setState({visible:true});
    var random=Math.floor(Math.random()*9000+1000);
   var api = DataAPI.customer_send_sms;
    fetch(api,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        phone:this.state.phone,
        crifCode:random,
      })

    })
    .then(res => res.json())
     .then(res => this.remindVerificationCode(res));
    this.setState({random:random});
  },
  remindVerificationCode:function(res) {
    this.setState({visible:false});
    if(!res.succ){
        Alert.alert('温馨提醒',res.msg);
        return;
      } 
      else {
          Alert.alert('成功提醒','验证码已发送成功', [{text: '确定'}]);
      }  
  },
  checkVerification:function(text) {
   var reg=/[^0-9]/g;
  var ph=text.replace(reg,'');
 this.setState({crifSend:ph});
  },
processSubmit:function(){
  
       this.dismiss();
    	if(!this.processDataValidation()) return ;
      else {
        this.setState({visible:true});
        this.processDataSubmit();
      }
    	
   },  
   async processDataSubmit(){
    this.setState({visible:true});
    	var url = DataAPI.customer_submit_infor;
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
           userId:userId, 
           storeCode:storeCode,
            parentName: this.state.parentName,
           etc: this.state.date, 
	         phone:this.state.phone,
           crifCode: this.state.crif,
            bc: this.state.scaneData,
                 
	    })
		}).then(res => res.json())
		 .then(res => this.processSubmitSucc(res));

    }, 
    processSubmitSucc(res){
       this.setState({visible:false});
  		Alert.alert('成功提醒','数据已提交成功', [{text: '确定'}]);
      this.stepSkuSalesBuyPage(res);
  	},
    stepSkuSalesBuyPage(res) {
      var customerId=res.customerId;
      var data=JSON.stringify({
          phone:this.state.phone,
            parentName: this.state.parentName,
           etc: this.state.date,
           customerId:customerId,        
      }); 
   
         this.props.navigator.push({
          id:'SkuSalesBuyPage',
          message:data,
        });
       
    },

    processDataValidation: function(){
      var phone =this.state.phone;
    	if(!phone){
    		Alert.alert('错误提醒','请输入手机号码', [{text: '确定'}]);
    		return false ;
    	}  
      if (phone.length!==11) {
        Alert.alert('错误提醒','请输入11位手机号码', [{text: '确定'}]);
        return false ;
      } 
    else	if(!this.state.parentName){
    		Alert.alert('错误提醒','请输入家长姓名', [{text: '确定'}]);
    		return false;
    	}


   else   if(this.state.newMember)
      {
        if(!this.state.crifSend||this.state.crifSend.length==0)
        {
          Alert.alert('错误提醒','新用户请输入验证码', [{text: '确定'}]);
          return false;
        }
        else {
           
             if (this.state.crifSend == this.state.random) 
             {

             this.setState({
              crif:this.state.random});  
            return true;
             }
            else 
            {
             Alert.alert('验证码不正确','请重新获取验证码', [{text: '确定'}]);
             return false;
             }  
        } 	
      
    }	
    	return true;
    },
    
    
    showDatePicker() {
      
       console.ignoredYellowBox = [
      'Warning: Failed propType',
      // Other warnings you don't want like 'jsSchedulingOverhead',
    ];
        var date = this.state.date;
        this.picker.showDatePicker(date, (d)=>{
            this.setState({date:d});
        });
    },

   

    render: function() {
      var PAGE=this.state.page;
      if (!PAGE) {
        return this.renderQuery();
      }
      else {
        return this.renderInputView();   
      }
	 		
    },

    renderQuery() {
           const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
      return (  
         <View style={styles.container}>

        <NavigationBar
      style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>扫码出货</Text></View>}
        leftButton={leftButtonConfig}/>
                          
          <TouchableHighlight  underlayColor={'#f3f3f2'} >
        <View style={styles.rowCl}>
          <View style={styles.rowContainer}>          
            <Text style={styles.rowCount}>手机号码:</Text>
            <View style={styles.rowDetailsContainer}>
              <TextInput style={styles.TextInputstyle} maxLength={11} placeholder='1300000000' keyboardType='numeric'  onChangeText={(text) =>this.onlyInputNumber(text)} value={this.state.phone} />
            </View>
                        <View style={{marginRight:2}}>            
            <Icon.Button name="search" backgroundColor="#142EB6" onPress={() => this.processSubmitQuery()}>
                <Text style={{fontFamily: 'Arial',color:'white', fontSize: 12}}>查询</Text>
            </Icon.Button>  
                        </View>
          </View>
          <View style={styles.separator} /> 
        </View>
      </TouchableHighlight>

       <Modal style={styles.modal} visible={this.state.visible} >            
          <GiftedSpinner />
        </Modal>   


      </View>
        
        );    
    },
     onlyInputNumber:function(text) {
  var reg=/[^0-9]/g;
  var phone=text.replace(reg,''); 
      this.setState({phone:phone});      
    
  },
   processSubmitQuery(){
    this.dismiss();
      if(!this.processDataValidationQuery()) return ;
     else {
      this.setState({visible:true});
       this.processDataSubmitQuery();
     }   
   },  
    processDataValidationQuery: function(){
      var phone=this.state.phone;
      if(!phone){
        Alert.alert('错误提醒','请输入手机号码', [{text: '确定'}]);
        return false ;
      }
       if (phone.length!==11) {
        Alert.alert('错误提醒','请输入11位手机号码', [{text: '确定'}]);
        return false ;
      } 
      return true;
    },
    async processDataSubmitQuery(){
      this.setState({visible:true});
      var url = DataAPI.customer_search_infor;
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
          phone:this.state.phone,
          storeCode:storeCode,
          pgCode:pgCode,
          userId:userId ,
      })
    })
        .then(res => res.json())
     .then(res => this.processSubmitSuccQuery(res));
    }, 
     processSubmitSuccQuery:function(res){
      this.setState({visible:false});
      if(!res.succ){
        Alert.alert('温馨提醒',res.msg);
        return;
      } 
      else {
       
      if (!res.customerId) {
        Alert.alert('未查询到会员信息','请注册', [
              {text: '取消', onPress: () => console.log('Cancel Pressed!')},
              {text: '确定', onPress: () => this.stepInputPag(res)},
        ]);
       

      }
      else {
        var customer =res.customerId;
        var data=JSON.stringify({
          phone:res.phone,
            parentName: res.parentName,
           etc: res.etc, 
           customerId:customer,       
      });
        this.props.navigator.push({
          id:'SkuSalesBuyPage',
          message:data,   
        });
      }
    }

    }, 
    stepInputPag(res) {
      this.setState({
        page:2,
      });
      
    },

 
    deleteCodeData:function(rowID) {
   var dataBlob3=this.state.dataBlob2;
   var countB=Number(rowID);
dataBlob3.splice(countB,1);
this.setState({dataBlob2:dataBlob3});
var ds =new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
 this.setState({
  dataSource:ds.cloneWithRows(this.state.dataBlob2),
 });
 this.processSubmitDelet();       
  },
    AlertDelet:function(rowID) {
     Alert.alert('删除提醒','确定要删除选择的产品码？', [
              {text: '取消', onPress: () => console.log('Cancel Pressed!')},
              {text: '确定', onPress: () => this.deleteCodeData(rowID)},
        ]);
  },

   _renderRow: function(rowData: string, sectionID: number, rowID: number) {
  var  countA=Number(rowID)+1;
  return (
      <TouchableHighlight underlayColor={'#f3f3f2'}  onPress={() => this.AlertDelet(rowID)}>
    <View style={styles.listText} >
       <Text style={{width:30,height:30,backgroundColor:'white',fontSize:15, textAlign: 'center', alignSelf:'center',marginLeft:0,marginTop:0}}>{countA}</Text>
       <Text style={{borderWidth:1,borderColor:'#a9a9a9',width:250,height:30,textAlign: 'center',paddingTop:8,}} numberOfLines={1} >{rowData}</Text>
     <Text style={{ fontSize: 13,textAlign: 'right', color: 'gray', marginTop:0, marginRight:0}} ><Icon name='close' size={30} color='orange' /></Text>
       <View style={{height:10,backgroundColor:'white'}}></View>
       </View>
       </TouchableHighlight>
    );
},


renderInputView() {
        const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () => this.setState({page:null}),
  };
		var date= this.state.date;


        return (  
         <View style={styles.container}>
     		<NavigationBar
      style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}></Text></View>}
        leftButton={leftButtonConfig}/>
                          
	        <TouchableHighlight underlayColor={'#f3f3f2'}>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>					
						<Text style={styles.rowCount}>手机号码:</Text>
						<View style={styles.rowDetailsContainer}>
							<Text style={styles.Textstyle}>{this.state.phone}</Text>
						</View>
              <View style={{marginRight:2}}>            
            <Icon.Button name="envelope" backgroundColor="#142EB6" onPress={() => this.checkSendVerificationCode()}>
                <Text style={{fontFamily: 'Arial',color:'white', fontSize: 12}}>发送验证码</Text>
            </Icon.Button>  
                        </View>

           


					</View>
					<View style={styles.separator} />	
				</View>
			</TouchableHighlight>
      

      <TouchableHighlight underlayColor={'#f3f3f2'}>
        <View style={styles.rowCl}>
          <View style={styles.rowContainer}>  
                     <View style={{ margin: 5, width:60}}>        
            <Text style={{color:'gray', fontSize: 13, textAlign: 'right'}}>验证码:</Text>  
                     </View>        
            <View style={styles.rowDetailsContainer}>
              <TextInput style={styles.TextInputstyle} placeholder='请输入用户出示的验证码' maxLength={4} onChangeText={(text) => this.checkVerification(text)} value={this.state.crifSend}/>
            </View>
          </View>
          <View style={styles.separator} /> 
        </View>
      </TouchableHighlight>

			
			<TouchableHighlight underlayColor={'#f3f3f2'}>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>					
						<Text style={styles.rowCount}>家长姓名:</Text>					
						<View style={styles.rowDetailsContainer}>
							<TextInput style={styles.TextInputstyle} placeholder='请输入家长的姓名' maxLength={12} onChangeText={(text) => this.setState({parentName:text})}  />
						</View>	
					</View>
					<View style={styles.separator} />	
				</View>
			</TouchableHighlight>
			
			<TouchableHighlight underlayColor={'#f3f3f2'} onPress={this.showDatePicker}>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>					
						<Text style={styles.rowCount}>宝宝生日:</Text>					
						<View ><Text style={{color:'gray', fontSize: 13, textAlign: 'right',margin:15}} numberOfLines={1}>{this.formatDate(date,'YYYY-MM-DD')}</Text></View>						
						<Icon name={'calendar'} size={30} color='#142EB6' />
					</View>
					<View style={styles.separator} />	
				</View>
			</TouchableHighlight>
			

       <View style={{height:120,backgroundColor:'white'}}>
         <ListView 
       dataSource={this.state.dataSource}
       renderRow={this._renderRow}/> 
       </View>
      <View style={styles.separator} />
			

     
     
			<View style={styles.bottomview}>  
				<Icon.Button name="save" backgroundColor="#142EB6" onPress={this.processSubmit}>
				    <Text style={{fontFamily: 'Arial', color:'white', fontSize: 15}}>确认提交</Text>
				 </Icon.Button>
			</View>

     
     
			
			<DateTimePicker ref={(picker)=>{this.picker=picker}}/>
       <Modal style={styles.modal} visible={this.state.visible} >            
                <GiftedSpinner/>
           </Modal>
     	</View>
        
        );
    },
   
	
	formatDate(date, format) {
        if (arguments.length < 2 && !date.getTime) {
            format = date;
            date = new Date();
        }
        typeof format != 'string' && (format = 'YYYY年MM月DD日 hh时mm分ss秒');
        var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
        return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|星期|周|www|week/g, function(a) {
            switch (a) {
            case "YYYY": return date.getFullYear();
            case "YY": return (date.getFullYear()+"").slice(2);
            case "MM": return date.getMonth() + 1;
            case "DD": return date.getDate();
            }
        });
    },
});

var styles = StyleSheet.create({
   container: {  
        flex: 1,  
       backgroundColor:'#FFFFFF',
    },

   navigationBar: {
      backgroundColor:'#142EB6',
    },  
    Textstyle:{
      height:30,
      marginRight:5,
      paddingTop:5,
      fontSize:17,
      textAlign:'left',
      color:'#696969',
    },
   TextInputstyle:{
    height:30,
    //color:'#696969',
    borderWidth:1,
    borderColor:'gray',
    marginRight:5,
   },
   rowCl:{
        flex: 1,
        flexDirection: 'column',
    },  
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height:50
    },
    rowCount: {
        fontSize: 13,
        textAlign: 'right',
        color: 'gray',
        margin: 5,
        width:60,
    },
    rowDetailsContainer: {
        flex: 1,
    },
    
    separator: {
        height: 1,
        backgroundColor: 'gray'
    }, 
     bottomview: {  
        backgroundColor: '#ECEDF1',  
        margin: 10,
    },   
    listText: {
    flexDirection:'row',
    
     borderBottomWidth:1,
     borderColor:'#a9a9a9',
    height:40
  }, 
    preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
   
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
module.exports = SkuSalesInputPage;

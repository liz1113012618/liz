/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import Camera from 'react-native-camera';
var React = require('react-native');
var t = require('tcomb-form-native');
var Icon = require('react-native-vector-icons/FontAwesome')
var { AppRegistry, StyleSheet, Text,TextInput, View, TouchableHighlight,ListView,AsyncStorage ,Dimensions,Alert, } = React;
import NavigationBar from 'react-native-navbar';
import Modal from 'react-native-root-modal';
var GiftedSpinner = require('react-native-gifted-spinner');

var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var SkuArravieDetail = React.createClass({
onPress: function () {
 
 if (this.state.dataBlob2.length>0) {
  this.processDataSubmit();
 }
 else{
 Alert.alert('扫码提醒','请先扫码!',[{text:'确认', onPress:() => console.log('Cancel Pressed!')}]);
  }
},
async processDataSubmit(){
    this.setState({visible:true});
      var url = DataAPI.scane;
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
        scaneData: this.state.scaneData,  
              
      })
    }).then(res => res.json())
      .then(res => this.processSubmitSucc(res));
    },
      processSubmitSucc: function(res){
        this.setState({visible:false});
        if(!res.succ){
        Alert.alert('错误码提醒',res.msg,[{text:'确定'}]);
        return;
      }
      else {
         if (!this.state.visible) {
           this.props.navigator.push({
            id:'SkuArravieConfirm',
            message:res,
            scaneData:this.state.scaneData,
           });  
         }
         
      }
      
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
 
   componentWillUnmount() {
      // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
    },
 
  getInitialState: function() {
    var ds =new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
	  return {
       visible: false,
      dataBlob2:[],
      dataSource: ds.cloneWithRows([]),
      codeData:null,
      page:null,
        actions:0,
        scaneData:'',
      	loaded: false,
	   };
  },
  hideModal() {
        this.setState({
            visible: false
        });
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
  
takePicture:function() {
   
   this.setState({page:'1'});
  },
  confirmReceipt:function() {
 if (this.state.dataBlob2.length>0) {
   this.onPress();
  }
 else{
 Alert.alert('扫码提醒','请先扫码!',[{text:'确认', onPress:() => console.log('Cancel Pressed!')}]);
  }
 },
takePictureBack:function() {
   
    this.setState({
      page:null,
      dataSource:this.state.dataSource.cloneWithRows(this._genRows())});
     
  },
  
render: function() {
   var PAGE=this.state.page;
if (!PAGE) {

 		return this.renderInputView();  
 }
 if (PAGE==='1') 
      {
        return this.renderScanCodeView();
        
      }

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
     <Text style={styles.rowCount} ><Icon name='close' size={30} color='orange' /></Text>
       <View style={{height:10,backgroundColor:'white'}}></View>
       </View>
       </TouchableHighlight>
    );
}, 

   renderScanCodeView: function() {
     const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () =>this.setState({page:null}),
  };
    return (
           <View style={styles.container}>
           <NavigationBar
      style={styles.navigationBar}
        title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{this.props.title}</Text></View>}
        leftButton={leftButtonConfig}/>

          <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'black',}}>
         <View style={{width:250,height:250,borderWidth:1,borderColor:'#adff2f'}}>   
        <Camera
        onBarCodeRead={this._onBarCodeRead}
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        </View>
        </View>      
      </View>
          );
   },

   renderInputView:function() {
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
       <ListView 
       style={styles.listView}
       dataSource={this.state.dataSource}
       renderRow={this._renderRow}/>   			
			<View style={styles.bottomview}> 
     <Icon.Button name="save" backgroundColor="#142EB6" onPress={this.takePicture}>
            <Text style={{fontFamily: 'Arial', color:'white', fontSize: 15}}>扫码收货</Text>
         </Icon.Button>   
	         </View>
			<View style={styles.bottomview}>  	       
	        <Icon.Button name="save" backgroundColor="#142EB6" onPress={this.confirmReceipt}>
            <Text style={{fontFamily: 'Arial', color:'white', fontSize: 15}}>确认</Text>
         </Icon.Button>
	        </View>
           <Modal style={styles.modal} visible={this.state.visible} >            
                <GiftedSpinner/>
           </Modal>
      </View>
    );
  },
});
var styles = StyleSheet.create({
  container: {  
        flex: 1,  
        backgroundColor: '#FFFFFF'  
    },
	header: {  
        height: 50,  		
        justifyContent: 'center',  
		    backgroundColor: '#142EB6' ,
		    alignItems: 'center',  
    },  
    headtitle: {  
        fontSize: 17,  
        color: '#FFFFFF',  
        marginTop: 10,  
        marginBottom: 10,  
    }, 
    rowCount: {
        fontSize: 13,
        textAlign: 'right',
        color: 'gray',
        marginTop:0,
        marginRight:0,
    },	
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  listView: {
     height: 400,
   marginTop:10,
   
    alignSelf: 'stretch'
  
  },
  listText: {
    flexDirection:'row',
    
     borderBottomWidth:1,
     borderColor:'#a9a9a9',
    height:40
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
   
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
   preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
 bottomview: {  
        backgroundColor: '#ECEDF1',  
        margin: 10,
    }, 
  navigationBar: {
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
module.exports = SkuArravieDetail;

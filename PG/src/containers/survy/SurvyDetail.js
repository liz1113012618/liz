/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, Text, View, ListView,TextInput,
		TouchableHighlight,Alert,
  AsyncStorage} = React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome')
import Modal from 'react-native-root-modal';
var GiftedSpinner = require('react-native-gifted-spinner');
import MultipleChoice from 'react-native-multiple-choice';
var dismissKeyboard =require('dismissKeyboard');

var SurvyDetail = React.createClass({
	dismiss:function() {
    dismissKeyboard();
  },
	async componentDidMount() {
     
		this.setState({
      navigator: this.props.navigator,
      visible:true,
    });
		var id = await AsyncStorage.getItem(DataKEY.USER_ROLE_ID);
		var url = DataAPI.survy_detail+'?surveyId='+this.props.survy.id;
		fetch(url)
		 .then(res => res.json())
		 .then(res => this.updateDataSource(res));
	},
   componentWillUnmount() {
      // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.dismiss();
    this.timer && clearTimeout(this.timer);
    },
    
    getInitialState: function() {
	  return {
	    dataSource: new ListView.DataSource({
	      rowHasChanged: (r1, r2) => r1 !== r2
	    }),
	    values:[],
	    questions:null,
      visible: true,
	   };
	},

	updateDataSource: function(data){
	    this.setState({
        visible:false,
	      dataSource: this.state.dataSource.cloneWithRows(data),
	      questions: data,
	    })
	},
  
  onValueChanged(rowID,value){
  
  	 var temp = this.state.values;
  	 temp[rowID]=value;
  	 this.setState({
      values: temp,
     });
  },
  
   processSubmit(){
      this.dismiss();
    	if(!this.processDataValidation()) return ;
    	this.processDataSubmit();
   },
   
   processDataValidation: function(){
   		var questions = this.state.questions;
   		for(var ii=0;ii< questions.length;ii++){
   			if(questions[ii].required=='1'){
   				if(!this.state.values[ii]||this.state.values[ii].length==0){
   					Alert.alert('错误提醒',questions[ii].title+'未填写！', [{text: '确定'}]);
    				return false;
   				}
   			}
   		}
   		return true;
   },
   
   async processDataSubmit(){
    	var url = DataAPI.survy_submit;
    	var storeCode = await AsyncStorage.getItem(DataKEY.USER_STORE_CODE);
    	var pgCode = await AsyncStorage.getItem(DataKEY.USER_NAME);
    	var userId = await AsyncStorage.getItem(DataKEY.USER_ID);
    	var inputValues = this.state.values.join('&&');
      	fetch(url, {
	    method: 'POST',
	    headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({
	    	pgCode: pgCode,
	    	storeCode: storeCode,
	        userId: userId,
            surveyId: this.props.survy.id,
            values: inputValues,
	    })
		}).then(res => res.json())
		 .then(res => this.processSubmitSucc(res));
   },
   
   processSubmitSucc(res){
  		if(!res.succ){
  			Alert.alert('温馨提醒',res.msg);
  			return;
  		}
  		Alert.alert('成功提醒','数据已提交成功', [{text: '确定'}]);
  		this.props.navigator.pop();
   },
  
  render: function() {
    const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () =>this.props.navigator.pop(),
  };
    return (
     	<View style={styles.container}>
     		<NavigationBar
        style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{this.props.title}</Text></View>}
        leftButton={leftButtonConfig}/>
			  
			<ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow }  />   

	        <View style={styles.bottomview}>  
				<Icon.Button name="save" backgroundColor="#142EB6" onPress={this.processSubmit}>
				    <Text style={{fontFamily: 'Arial', color:'white', fontSize: 15}}>确认提交</Text>
				 </Icon.Button>
			</View>	
       <Modal style={styles.modal} visible={this.state.visible} >            
                 <GiftedSpinner/>
           </Modal>   		
      </View>
     
    );
  },
  
  renderRow: function(survyDetail, sectionID, rowID: number) {
 	var req ='';
  	if(survyDetail.required=='1'){
  		req = '必填';
  	}
 
  	if(survyDetail.type ==0){
  		return this.renderText(survyDetail,rowID,req);
  	}
  	
  	if(survyDetail.type ==1){
  		return this.renderNumber(survyDetail,rowID,req);
  	}
  	
  	if(survyDetail.type ==2){
  		return this.renderSingleBox(survyDetail,rowID,req);
  	}
  	
  	if(survyDetail.type ==3){
  		return this.renderMuileBox(survyDetail,rowID,req);
  	}
  },
 
  renderText: function(sd, rowID,req) {
  	
    return (
    	<TouchableHighlight underlayColor={'#f3f3f2'}>
			<View style={styles.rowCl}>
				<View style={styles.rowContainer}>					
					<Text style={styles.rowTitle}>{Number(rowID)+1}.{sd.title}（填写文字|{req}）</Text>
					<View style={styles.rowDetailsContainer}>
						<TextInput style={styles.selectInput}  placeholder='' onChangeText={(text) => this.onValueChanged(rowID,text)} />
					</View>
				</View>
				<View style={styles.separator} />	
			</View>
		</TouchableHighlight>
    	);	
   },
   
   renderNumber: function(sd, rowID,req) {
    return (
    	<TouchableHighlight underlayColor={'#f3f3f2'}>
			<View style={styles.rowCl}>
				<View style={styles.rowContainer}>					
					<Text style={styles.rowTitle}>{Number(rowID)+1}.{sd.title}（填写数字|{req}）</Text>
					<View style={styles.rowDetailsContainer}>
						<TextInput  style={styles.selectInput} placeholder=''  keyboardType={'numeric'} onChangeText={(text) => this.onValueChanged(rowID,text)} />
					</View>
				</View>
				<View style={styles.separator} />	
			</View>
		</TouchableHighlight>
    	);	
   },
   
   renderSingleBox: function(sd, rowID,req) {
   var options = sd.questionOptions.split(",") ;
    //alert(options);
    return (
    	<View underlayColor={'#f3f3f2'} >
			<View style={styles.rowCl}>
				<View style={styles.rowContainer}>					
					<Text style={styles.rowTitle}>{Number(rowID)+1}.{sd.title}（单选|{req}）</Text>
					
					<View style={styles.rowDetailsContainer,styles.rowMchoise}>
						<MultipleChoice 
						options={options}
						maxSelectedOptions={1}
						onSelection={(option,selectedOptions)=>this.onValueChanged(rowID,selectedOptions)}
						/>
					</View>
				</View>
				<View style={styles.separator} />	
			</View>
		</View>
    );	
   },
   
    renderMuileBox: function(sd, rowID,req) {
    var options = sd.questionOptions.split(",") ;
    //alert(options);
    return (
    	<View underlayColor={'#f3f3f2'}>
			<View style={styles.rowCl}>
				<View style={styles.rowContainer}>					
					<Text style={styles.rowTitle}>{Number(rowID)+1}.{sd.title}（多选|{req}）</Text>
					<View style={styles.rowDetailsContainer,styles.rowMchoise}>
						<MultipleChoice 
						options={options}
						maxSelectedOptions={options.length}
						onSelection={(option,selectedOptions)=>this.onValueChanged(rowID,selectedOptions)}
						/>
					</View>
				</View>
				<View style={styles.separator} />	
			</View>
		</View>
    );	
   }
  
});

var styles = StyleSheet.create({
  container: {  
        flex: 1,  
        backgroundColor: '#FFFFFF'  
    },
    navigationBar: {
      backgroundColor:'#142EB6',
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
  
   rowCount: {
        fontSize: 20,
        textAlign: 'right',
        color: 'gray',
        margin: 10,
        marginLeft: 15,
    },
    rowDetailsContainer: {
        flex: 1,
    },
    rowCl: {
          flex:1,
    },
    rowContainer: {
          flex:1,
          marginLeft:15,
    },
    rowTitle: {
        fontSize: 15,
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
    
     rowMchoise: {
        marginLeft: 20
    },
    separator: {
        height: 1,
        backgroundColor: 'gray'
    },
  selectInput:{
    height:30,
    borderColor:'gray',
    borderWidth:1,
    margin:10,
  },
   bottomview: {  
    backgroundColor: '#ECEDF1',  
    margin: 10,
   }, 
   
   modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  
   modal4: {
    height: 300
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

module.exports = SurvyDetail;

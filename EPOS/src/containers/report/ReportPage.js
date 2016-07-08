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
  Dimensions,
  AsyncStorage,
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome')
import Modal from 'react-native-root-modal';
var GiftedSpinner = require('react-native-gifted-spinner');
var PTRView=require('react-native-pull-to-refresh');



var ReportPage = React.createClass({
   _refresh:function() {
    this.setState({visible:true});
    return new Promise((resolve)=>{setTimeout(()=>{resolve(),this.componentDidMount()},1000)});
  },

	async componentDidMount() {
		this.setState({
      navigator: this.props.navigator,
      visible:true,
    });
		var id = await AsyncStorage.getItem(DataKEY.USER_ID);
		var roleid = await AsyncStorage.getItem(DataKEY.USER_ROLE_ID);
		var url = DataAPI.reporting_list_ep+'?id='+id+"&roleId="+roleid;
		fetch(url)
		 .then(res => res.json())
		 .then(res => this.updateDataSource(res));
	},
	componentWillUnmount() {
      // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
    },

	getInitialState: function() {
	  return {
	    dataSource: new ListView.DataSource({
	      rowHasChanged: (r1, r2) => r1 !== r2
	    }),
	    visible: true,
      dataBool:true,
	   };
	},

	updateDataSource: function(data){
    if (!data.length==0) {
       this.setState({
        visible:false,
        dataSource: this.state.dataSource.cloneWithRows(data)
      })
    }
    else{
      this.setState({
        visible:false,
        dataBool:false,
      })
    }
	   
	},

	render: function() {
		 const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
		let title= '报表管理';
		let header = 
		 <NavigationBar
		 style={styles.navigationBar}
		 leftButton={leftButtonConfig}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{title}</Text></View>}/>
         if (this.state.dataBool) {
          return (
      <View style={styles.container}>
        {header}
        <PTRView
        onRefresh={this._refresh}>
      <ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow }  />
         <Modal style={styles.modal} visible={this.state.visible} >            
                 <GiftedSpinner/>
           </Modal>
        </PTRView>
      </View>
    ); 
         }
         else{
          return (
      <View style={styles.container}>
        {header}
          <PTRView
        onRefresh={this._refresh}>
       <View style={{backgroundColor:'#FFFFFF',height:Dimensions.get('window').height-100,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#a9a9a9',fontSize:18,textAlign:'center'}}>暂无报表</Text></View>
         <Modal style={styles.modal} visible={this.state.visible} >            
                 <GiftedSpinner/>
           </Modal>
           </PTRView>
      </View>
    ); 
         }
		
	},
	
	messageDetail: function (message){
	   	this.props.navigator.push({
	      id: 'ReportDetail',
	      title: message.title,
	      message: message,
	    });
	},

	renderRow: function(message) {
		return (		  
			<TouchableHighlight underlayColor={'#f3f3f2'} onPress={ this.messageDetail.bind(this, message) }>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowCount}>
							<Icon name='envelope' size={30} color='#142EB6' />
						</Text>
						<View style={styles.rowDetailsContainer}>
							<Text style={styles.rowTitle}>
								{message.title}
							</Text>
							<Text style={styles.rowDetailsLine}>
								{message.rmk}
							</Text>
						</View>
						<Text style={styles.rowCount}>
							<Icon name='angle-right' size={15} color='gray' />
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
        fontSize: 20,
        textAlign: 'right',
        color: 'gray',
        margin: 10,
        marginLeft: 15,
    },
    rowDetailsContainer: {
        flex: 1,
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
    separator: {
        height: 1,
        backgroundColor: 'gray'
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

module.exports = ReportPage;

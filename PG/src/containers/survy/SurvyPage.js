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
  AsyncStorage
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome')
import Modal from 'react-native-root-modal';
var GiftedSpinner = require('react-native-gifted-spinner');
var PTRView=require('react-native-pull-to-refresh');


var SurvyPage = React.createClass({
 _refresh:function() {
    this.setState({visible:true});
    return new Promise((resolve)=>{setTimeout(()=>{resolve(),this.componentDidMount()},1000)});
  },
	async componentDidMount() {
		this.setState({
      navigator: this.props.navigator,
      visible:true,
    });
		var id = await AsyncStorage.getItem(DataKEY.USER_ROLE_ID);
		var url = DataAPI.survy_list+'?id='+id;
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
		let title= '问卷调查';
		const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
		let header = 
		<NavigationBar
		style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>问卷调查</Text></View>}
        leftButton={leftButtonConfig}/>
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
       <View style={{backgroundColor:'#FFFFFF',height:Dimensions.get('window').height-100,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#a9a9a9',fontSize:18,textAlign:'center'}}>暂无问卷</Text></View>
      <Modal style={styles.modal} visible={this.state.visible} >            
                 <GiftedSpinner/>
           </Modal>
           </PTRView>
      </View>
    ); 
        }

	
	},
	
	survyDetail: function (survy){
	   	this.props.navigator.push({
	      id: 'SurvyDetail',
	      title: survy.title,
	      survy: survy,
	    });
	},

	renderRow: function(survy) {
		return (		  
			<TouchableHighlight underlayColor={'#f3f3f2'} onPress={ this.survyDetail.bind(this, survy) }>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowCount}>
							<Icon name='file' size={30} color='#142EB6' />
						</Text>
						<View style={styles.rowDetailsContainer}>
							<Text style={styles.rowTitle}>
								{survy.title}
							</Text>
							<Text style={styles.rowDetailsLine}>
								{survy.startDateStr} / {survy.endDateStr}
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

module.exports = SurvyPage;

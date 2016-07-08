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
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var Icon = require('react-native-vector-icons/FontAwesome')
import Modal from 'react-native-root-modal';
var GiftedSpinner = require('react-native-gifted-spinner');
var PTRView=require('react-native-pull-to-refresh');


var StorePointPage = React.createClass({
 _refresh:function() {
    return new Promise((resolve)=>{setTimeout(()=>{resolve(),this.componentDidMount()},1000)});
  },
	componentDidMount: function() {
			 this.timer = setTimeout(
        ()=>{this.hideModal();},
        500
        );
		this.setState({navigator: this.props.navigator});
		var url = DataAPI.storepint_list;
		fetch(url)
		 .then(res => res.json())
		 .then(res => this.updateDataSource(res));
	},
	componentWillUnmount() {
      // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
    },
    hideModal() {
        this.setState({
            visible: false
        });
    },

	getInitialState: function() {
	  return {
	    dataSource: new ListView.DataSource({
	      rowHasChanged: (r1, r2) => r1 !== r2
	    }),
	    visible: true,
	   };
	},

	updateDataSource: function(data){
	    this.setState({
	      dataSource: this.state.dataSource.cloneWithRows(data)
	    })
	},

	render: function() {
		let title= '门店积分';
			const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () =>this.props.navigator.pop(),
  };
		let header = 
		<NavigationBar
        style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{title}</Text></View>}
        leftButton={leftButtonConfig}/>

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
	},

	renderRow: function(storepoint) {
		return (		  
			<TouchableHighlight underlayColor={'#f3f3f2'} >
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowCount}>
							<Icon name='money' size={30} color='#142EB6' />
						</Text>
						<View style={styles.rowDetailsContainer}>
							<Text style={styles.rowTitle}>
								{storepoint.parentName}|{storepoint.phone}
							</Text>
							<Text style={styles.rowDetailsLine}>
								 {storepoint.ptype} | {storepoint.pdate}
							</Text>
						</View>
						<Text style={styles.rowCount}>
							积分：{storepoint.point}个
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

module.exports = StorePointPage;

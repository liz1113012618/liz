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

var StoreListPage = React.createClass({

	componentDidMount: function() {
		this.setState({navigator: this.props.navigator});
		var url = DataAPI.store_list;
		fetch(url)
		 .then(res => res.json())
		 .then(res => this.updateDataSource(res));
	},

	getInitialState: function() {
	  return {
	    dataSource: new ListView.DataSource({
	      rowHasChanged: (r1, r2) => r1 !== r2
	    }),
	   };
	},

	updateDataSource: function(data){
	    this.setState({
	      dataSource: this.state.dataSource.cloneWithRows(data)
	    })
	},

	render: function() {
		let title= '门店管理';
		let header = 
		<NavigationBar
		style={styles.navigationBar}
        title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{title}</Text></View>}/>

		return (
			<View style={styles.container}>
				{header}
			<ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow }  />
			</View>
		); 
	},
	
	storeItemDetail: function (storeItem){
	   	this.props.navigator.push({
	      id: 'StoreDetail',
	      title: storeItem.name,
	      storeItem: storeItem,
	    });
	},

	renderRow: function(storeItem) {
		return (		  
			<TouchableHighlight underlayColor={'#f3f3f2'} onPress={ this.storeItemDetail.bind(this, storeItem) }>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowCount}>
							<Icon name='map-marker' size={30} color='#142EB6' />
						</Text>
						<View style={styles.rowDetailsContainer}>
							<Text style={styles.rowTitle}>
								{storeItem.code}|{storeItem.name}
							</Text>
							<Text style={styles.rowDetailsLine}>
								 {storeItem.address} | {storeItem.phone}
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

});

module.exports = StoreListPage;

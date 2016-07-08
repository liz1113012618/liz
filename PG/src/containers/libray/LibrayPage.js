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
  Dimensions,
  View,
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var Icon = require('react-native-vector-icons/FontAwesome')
import Modal from 'react-native-root-modal';
var GiftedSpinner = require('react-native-gifted-spinner');
var PTRView=require('react-native-pull-to-refresh');

var LibrayPage = React.createClass({
	 _refresh:function() {
	 	this.setState({visible:true});
    return new Promise((resolve)=>{setTimeout(()=>{resolve(),this.componentDidMount()},1000)});
  },

	componentDidMount: function() {
		
		this.setState({
			navigator: this.props.navigator,
			visible:true,
		});
		var url = DataAPI.libray_list+'?id='+this.state.parentId;
		fetch(url)
		 .then(res => res.json())
		 .then(res => this.updateDataSource(res,this.state.parentId));
	},
	componentWillUnmount() {
      // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
    },

	getInitialState: function() {
		var book = this.props.book;
		var parentId =0;
		var title =  '图书馆';
		if(book){
			parentId = book.id;
			title = book.title;
		}
	
	  return {
	    dataSource: new ListView.DataSource({
	      rowHasChanged: (r1, r2) => r1 !== r2
	    }),
	    parentId:parentId,
	    title:title,
	    visible: true,
	    dataBool:true,

	   };
	},

	updateDataSource: function(data,parentId){
		if (!data.length==0) {
			 this.setState({
	    	visible:false,
	      dataSource: this.state.dataSource.cloneWithRows(data),
	      parentId :parentId,
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

		let title= '图书馆';
		const leftButtonConfig = {
    title: '返回',
    tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
		let header = 
		<NavigationBar
		 style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>{title}</Text></View>}
        leftButton={leftButtonConfig}/>
        if (this.state.dataBool) {
        	return (
			<View style={styles.container}>
				{header}
				<PTRView
				onRefresh={this._refresh}>
			<ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow }  />
			<Modal style={styles.modal} visible={this.state.visible} >            
          <GiftedSpinner />
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
				 <View style={{backgroundColor:'#FFFFFF',height:Dimensions.get('window').height-100,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#a9a9a9',fontSize:18,textAlign:'center'}}>暂无图书</Text></View>
			<Modal style={styles.modal} visible={this.state.visible} >            
          <GiftedSpinner />
      </Modal>
      </PTRView>
			</View>
		); 
        }

		
	},
	
	bookDetail: function (book){
		var comId = null;
		if(book.type ==1){
	   		comId = 'LibrayDetail';
	    }
	    else{
	    	comId = 'LibrayPage';
	    }
	    this.props.navigator.push({
      		id: comId,
      		title: book.title,
      		book: book,
    	});
	},

	renderRow: function(book) {
		if (book.type ==1) {
		return (		  
			<TouchableHighlight underlayColor={'#f3f3f2'} onPress={ this.bookDetail.bind(this, book) }>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowCount}>
							<Icon name='book' size={30} color='#142EB6' />
						</Text>
						<View style={styles.rowDetailsContainer}>
							<Text style={styles.rowTitle}>
								{book.title}
							</Text>
							<Text style={styles.rowDetailsLine}>
								| {book.updateTime}
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
	}
	else{
		return (

			<TouchableHighlight underlayColor={'#f3f3f2'} onPress={ this.bookDetail.bind(this, book) }>
				<View style={styles.rowCl}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowCount}>
							<Icon name='ellipsis-v' size={30} color='#142EB6' />
						</Text>
						<View style={styles.rowDetailsContainer}>
							<Text style={styles.rowTitle}>
								{book.title}
							</Text>
							<Text style={styles.rowDetailsLine}>
								| {book.updateTime}
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
	}
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

module.exports = LibrayPage;

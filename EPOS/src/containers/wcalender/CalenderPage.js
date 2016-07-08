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
  AsyncStorage
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var Icon = require('react-native-vector-icons/FontAwesome')

var Calendar = require('react-native-calendar');
var moment = require('moment');

var customDayHeadings = ['日', '一', '二', '三', '四', '五', '六']


var CalenderPage = React.createClass({
	
	getInitialState: function() {
    	return {
      	selectedDate: moment().format(),
    	
   	 	};
    },
	  
	render: function() {
		 const leftButtonConfig = {
    title: '返回',
     tintColor:'white',
    handler: () => this.props.navigator.pop(),
  };
		return( 
		
		<View style={styles.container}>
		
		  <NavigationBar
    style={styles.navigationBar}
         title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>我的考勤</Text></View>}
        leftButton={leftButtonConfig}/>
		
        <Calendar
          ref="calendar"
          //eventDates={['2016-02-01']}
          scrollEnabled={true}
          showControls={true}
          dayHeadings={customDayHeadings}
          titleFormat={'YYYY/MM '}
          prevButtonText={'上月'}
          nextButtonText={'下月'}
          onDateSelect={(date) => this.setState({selectedDate: date})}
          onTouchPrev={() => console.log('Back TOUCH')}
          onTouchNext={() => console.log('Forward TOUCH')}
          onSwipePrev={() => console.log('Back SWIPE')}
          onSwipeNext={() => console.log('Forward SWIPE')}/>
        <Text>Selected Date: {moment(this.state.selectedDate).format('YYYY/MM/DD ')}</Text>
      </View>);
	},
	
	 async getWorkTimeDetail(date){
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
  
	
});

const styles = StyleSheet.create({
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
   row: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: '#F6F6F6',
	},
	separator: {
		height: 1,
		backgroundColor: '#CCCCCC',
	},
	thumb: {
		width: 24,
		height: 24,
	},
	text: {
		flex: 1,
	}, 

});

module.exports = CalenderPage;

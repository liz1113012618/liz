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
  AsyncStorage,
  Dimensions,
}= React;
var NavigationBar = require('react-native-navbar');
var DataAPI = require('../../utils/DataAPI');
var DataKEY = require('../../utils/DataKEY');
var Icon = require('react-native-vector-icons/FontAwesome');
var CalendarPicker = require('react-native-calendar-picker');
var moment = require('moment');



var CalenderPage = React.createClass({
	
	getInitialState: function() {

    	return {
        dataSource: new ListView.DataSource({rowHasChanged:(r1,r2) =>r1 !==r2}),
        date: new Date(),
      
   	 	};
    },
    componentDidMount:function() {
      this.getWorkTimeDetail();
    },
    onDateChange: function(date) {
    this.setState({ date: date });
    this.getWorkTimeDetail();
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
		  <CalendarPicker 
          selectedDate={this.state.date}
          onDateChange={this.onDateChange}
          titleFormat={'YYYY/MM '}
          weekdays = {['一', '二', '三', '四', '五', '六', '七']}
          months = {['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']}
          nextTitle={'下月'}
          previousTitle={'上月'}
          screenWidth={Dimensions.get('window').width}
          selectedBackgroundColor={'#5ce600'} />

        <Text >选择日期: {moment(this.state.date).format('YYYY/MM/DD ')}</Text>
         <View style={styles.separator} /> 
       <ListView dataSource={this.state.dataSource} renderRow={this.renderRow}/>
      </View>);
	},

  renderRow:function(data) {
    var str1=data.start_time;
    var str2=data.end_time;
    var startTime=str1.substr(11,5);
    var endTime=str2.substr(11,5);
    return(
      <TouchableHighlight underlayColor={'#f3f3f2'} >
        <View style={styles.rowCl}>
          <View style={styles.rowContainer}>
            <Text style={styles.rowCount}>
              
            </Text>
            <View style={styles.rowDetailsContainer}>
              <Text style={styles.rowTitle}>
              {startTime}-{endTime}
              </Text>
            </View>
            <Text style={styles.rowCount}>
                {data.duration}分钟
              
            </Text>
          </View>
          <View style={styles.separator} /> 
        </View>
      </TouchableHighlight>
      );
  },
	
	 async getWorkTimeDetail(){
    
   
      var pgCode = await AsyncStorage.getItem(DataKEY.USER_NAME);
      var date=moment(this.state.date).format('YYYY-MM-DD ');
        var api = DataAPI.pg_worktime_attendence+'?pgCode='+pgCode+"&date="+date;
        fetch(api)
         .then(res => res.json())
         .then(res => this.WorkTime(res)); 
	 },
   WorkTime:function(res) {
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(res)
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
        fontSize: 18,
        textAlign: 'right',
        color: '#FF6600',
        margin: 10,
       
    },
    rowDetailsContainer: {
        flex: 1,
    },
    rowTitle: {
        fontSize: 15,
        marginLeft:5,
        marginTop:10,
        marginBottom: 4,
        color: '#FF6600'
    },
    
    separator: {
        height: 1,
        backgroundColor: 'gray'
    },

});

module.exports = CalenderPage;

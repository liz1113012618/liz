/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
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
  Dimensions
} = React;
var NavigationBar = require('react-native-navbar');
var Icon = require('react-native-vector-icons/FontAwesome')

var LibrayPage = require('../libray/LibrayPage');
var SurvyPage = require('../survy/SurvyPage');
var MemberPage = require('../member/MemberPage');
var SkuArraviePage = require('../skuarravie/SkuArraviePage');

var SkuOderPage = require('../skuorder/SkuOrderPage');
var CalenderPage = require('../wcalender/CalenderPage');

var WorkPagePG = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
		dataSource: ds.cloneWithRows(this._genRows({})),
		btnTitles : ['图书馆','问卷调查','会员建议','我的考勤','产品到货','扫码出货',,'样品到货','报表管理','今日开单'],
		btnColor : ['#58D6AE','#D68DEE','#F4799E','#9AC441','#E1C072','#849DDD','#58D6AE','#D68DEE','#58D6AE'],
		btnIcon : ['folder','book','users','calendar','bus','shopping-cart','truck','credit-card','credit-card'],
		selected:  null ,
		headTitle:'工作',
    };
  },
  

  render: function() {
	let companets = <ListView
				dataSource={this.state.dataSource}
				contentContainerStyle={styles.list}
				renderRow={this._renderRow}
			  />;
	let header = <NavigationBar
		style={styles.navigationBar}
        title={<View style={{marginBottom:5}}><Text style={{fontSize:17,alignSelf:'center',color:'white'}}>工作</Text></View>}/>;
    return (
	  <View style={styles.container}>
	  		{header}
	  		{companets}
	  </View>
   	);
  },
  
  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="transparent">
        <View>
          <View style={{
			justifyContent: 'center',
			padding: 20,
			margin: 5,
			width: (Dimensions.get('window').width-30)/3,
			height: 100,
			alignItems: 'center',
			borderRadius: 5,
		    backgroundColor: this.state.btnColor[rowID]
		  }} >
			<Icon name={this.state.btnIcon[rowID]} size={30} color='#ffffff' />
			<Text style={styles.text}>
			  {rowData}
			</Text>
			 
          </View>
        </View>
      </TouchableHighlight>
    );
  },
  
   _genRows: function(pressData: {[key: number]: boolean}): Array {
	    var btnTitles = ['图书馆','问卷调查','会员建议','我的考勤','产品到货','扫码出货','样品到货','报表管理','今日开单'];
		var dataBlob = []; 
		for (var ii = 0; ii < btnTitles.length; ii++) { 
			var pressedText = btnTitles[ii];
			dataBlob.push(pressedText); 
		} 
		return dataBlob; 
	},

  _pressRow: function(rowID: number) {
  		var companets = null;
		if(rowID==0){
			companets = 'LibrayPage';
			this.props.navigator.push({
	      id: companets,
	      title: this.state.btnTitles[rowID],
	    });
		}
		if(rowID==1){
			companets = 'SurvyPage';
			this.props.navigator.push({
	      id: companets,
	      title: this.state.btnTitles[rowID],
	    });
		}
		if(rowID==2){
			companets = 'MemberPage';
			this.props.navigator.push({
	      id: companets,
	      title: this.state.btnTitles[rowID],
	    });
		}
		if(rowID==3){
			companets = 'CalenderPage';
			this.props.navigator.push({
	      id: companets,
	      title: this.state.btnTitles[rowID],
	    });
		}
		if(rowID==4){
			companets = 'SkuArraviePage';
			this.props.navigator.push({
	      id: companets,
	      title: this.state.btnTitles[rowID],
	    });
		}
		if(rowID==5){
			companets = 'SkuSalesInputPage';
			this.props.navigator.push({
	      id: companets,
	      title: this.state.btnTitles[rowID],
	    });
		}
		
		
		if (rowID==6) {
			companets = 'SweepPage';
				this.props.navigator.push({
	      id: companets,
	      title: this.state.btnTitles[rowID],
	    });
		}
			if (rowID==7) {
			companets = 'ReportPage';
				this.props.navigator.push({
	      id: companets,
	      title: this.state.btnTitles[rowID],
	    });	 
		}
			if(rowID==8){
			companets = 'SkuOrderPage';
				this.props.navigator.push({
	      id: companets,
	      title: this.state.btnTitles[rowID],
	    });
		}
	},
		
  
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
        flexDirection :'row',   		
        justifyContent: 'center',  
		backgroundColor: '#142EB6' ,
    },  
    headtitle: {  
        fontSize: 17,  
        color: '#FFFFFF',  
        marginTop: 10,  
        marginBottom: 10,  
    }, 	
	
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold',
	color: '#FFFFFF'
  },
 
});

module.exports = WorkPagePG;
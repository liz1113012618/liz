/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    ListView,
    TextInput,
    ScrollView,
    AsyncStorage
}= React;

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomePageEP from '../home/HomePageEP';
import MessagePage from '../message/MessagePage';
import WorkPage from '../work/WorkPageEP';
import SettingsPage from '../settings/SettingsPage';
import StoreListPage from '../store/StoreListPage';


var MainPageEP = React.createClass({

	

	 getInitialState() {
	    return {
	      selectedTab: 'home',
	      roleId:null
	    };
	  },

	 render: function() {
	 	var homePage  =<HomePageEP navigator={this.props.navigator} />;
	 	
        return (
            <TabNavigator>
            
		        <TabNavigator.Item  title="首页"  selected={this.state.selectedTab === 'home'}
		        	renderIcon={() => <Icon name="home" size={25} color="#142EB6" />}
                    renderSelectedIcon={() => <Icon name="home" size={25} color="#FFC90E" />}
                    onPress={() => this.setState({ selectedTab: 'home' })}
		        >
		          <View style={styles.container}>
		            {homePage}
		          </View>
		        </TabNavigator.Item>
		        
		        <TabNavigator.Item  title="消息" selected={this.state.selectedTab === 'message'}
		        	renderIcon={() => <Icon name="envelope" size={25} color="#142EB6" />}
                    renderSelectedIcon={() => <Icon name="envelope" size={25} color="#FFC90E" />}
                    onPress={() => this.setState({ selectedTab: 'message' })}
		        >
		          <View style={styles.container}>
		            <MessagePage navigator={this.props.navigator} />
		          </View>
		        </TabNavigator.Item>
		        
		         <TabNavigator.Item  title="工作" selected={this.state.selectedTab === 'table'}
		         	renderIcon={() => <Icon name="table" size={25} color="#142EB6" />}
                    renderSelectedIcon={() => <Icon name="table" size={25} color="#FFC90E" />}
                    onPress={() => this.setState({ selectedTab: 'table' })}
		         >
		          <View style={styles.container}>
		            <WorkPage navigator={this.props.navigator} />
		          </View>
		        </TabNavigator.Item>
		        
		         <TabNavigator.Item  title="设置" selected={this.state.selectedTab === 'settings'}
		         	renderIcon={() => <Icon name="wrench" size={25} color="#142EB6" />}
                    renderSelectedIcon={() => <Icon name="wrench" size={25} color="#FFC90E" />}
                    onPress={() => this.setState({ selectedTab: 'settings' })}
		         >
		          <View style={styles.container}>
		            <SettingsPage navigator={this.props.navigator} />
		          </View>
		        </TabNavigator.Item>
		        
		      </TabNavigator>
        );
    },
    
});

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

module.exports = MainPageEP;

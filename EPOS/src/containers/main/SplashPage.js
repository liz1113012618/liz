'use strict';

var React = require('react-native');
var {
  AsyncStorage,
  Image,
  View,
  StyleSheet,
} = React;

var SplashScreen = React.createClass({

  render: function(){
    return(
    	<View style={styles.container}>
        <Image
			style={styles.backgroundImage}
			source={require('../../images/splash.png')}
		/>
		</View>
    );
  }
});

var styles = StyleSheet.create({
 
  backgroundImage: {
 	
	resizeMode:'cover',
  },
  
 container: {  
    flex: 1,  
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF' ,
    alignSelf  : 'auto',
    justifyContent :'center',
  },
 
});

module.exports = SplashScreen;

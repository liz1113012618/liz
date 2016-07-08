/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  Navigator,
  TouchableOpacity,
} = React;
var CodePush = require('react-native-code-push');
var Login = require('./src/containers/main/LoginPage');
var Splash = require('./src/containers/main/SplashPage');
var MainPageEP = require('./src/containers/main/MainPageEP');
var MessageDetail = require('./src/containers/message/MessageDetail');
var LibrayPage = require('./src/containers/libray/LibrayPage');
var SurvyPage = require('./src/containers/survy/SurvyPage');
var MemberPage = require('./src/containers/member/MemberPage');
var MemberPageDetail = require('./src/containers/member/MemberPageDetail');
var SkuArraviePage = require('./src/containers/skuarravie/SkuArraviePage');
var SkuSalesBuyPage = require('./src/containers/skusales/SkuSalesBuyPage');
var SkuSalesBuyDetail = require('./src/containers/skusales/SkuSalesBuyDetail');

var SkuSalesConfirm = require('./src/containers/skusales/SkuSalesConfirm');
var SkuSalesInputPage = require('./src/containers/skusales/SkuSalesInputPage');
var SkuOrderPage = require('./src/containers/skuorder/SkuOrderPage');
var CalenderPage = require('./src/containers/wcalender/CalenderPage');
var LibrayDetail = require('./src/containers/libray/LibrayDetail');
var SurvyDetail = require('./src/containers/survy/SurvyDetail');

var SkuArravieConfirm = require('./src/containers/skuarravie/SkuArravieConfirm');
var SkuArravieDetail = require('./src/containers/skuarravie/SkuArravieDetail');
var StoreDetail = require('./src/containers/store/StoreDetail');
var StorePointPage = require('./src/containers/storepoint/StorePointPage');
var ChangePwd = require('./src/containers/settings/ChangePwd');
var SweepPage = require('./src/containers/sweep/SweepPage');
var SweepDetail = require('./src/containers/sweep/SweepDetail');
var SweepConfirm = require('./src/containers/sweep/SweepConfirm');

var ReportPage = require('./src/containers/report/ReportPage');
var ReportDetail=require('./src/containers/report/ReportDetail');
var App = require('./src/containers/App');


class redemo extends Component {
  componentDidMount() {
    //console.disableYellowBox=true;
    // CodePush.sync({
    //     deploymentKey:'DZnNbewTM-fagrjU4DaHifc9cxKnVkh_IxDAe',
    //     updateDialog: {
    //         optionalIgnoreButtonLabel: '稍后',
    //         optionalInstallButtonLabel: '后台更新',
    //         optionalUpdateMessage: 'Reading有新版本了，是否更新？',
    //         title: '更新提示'
    //     },
    //     installMode: CodePush.InstallMode.ON_NEXT_RESTART
    // });
}
  render() {
    return (
      <Navigator
          initialRoute={{id: 'App', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }
  renderScene(route, navigator) {
  
    var routeId = route.id;
    if (routeId === 'App') {
      return (
        <App
          navigator={navigator} />
      );
    }
     if (routeId === 'LoginPage') {
      return (
        <Login
          navigator={navigator} />
      );
    }

    if (routeId === 'MainPageEP') {
      return (
        <MainPageEP
          navigator={navigator} />
      );
    }
    
    if (routeId === 'MessageDetail') {
      return (
        <MessageDetail
          navigator={navigator} 
          title={route.title}
          message={route.message}/>
      );
    }
    
   if (routeId === 'LibrayPage') {
     return (
        <LibrayPage
          navigator={navigator} book={route.book} />
      );
  }
  if (routeId === 'SurvyPage')  {
   return (
        <SurvyPage
          navigator={navigator} />
      );
  }
  if (routeId === 'MemberPage') { 
   return (
        <MemberPage
          navigator={navigator} />
      );
  }
   if (routeId === 'MemberPageDetail') { 
   return (
        <MemberPageDetail
          navigator={navigator}
          message={route.message} />
      );
  }
  if (routeId === 'CalenderPage') { 
   return (
        <CalenderPage
          navigator={navigator} />
      );
  }
  if (routeId === 'SkuArraviePage')  {
   return (
        <SkuArraviePage
          navigator={navigator} />
      );
  }
  
   if (routeId === 'SkuSalesBuyPage')  {
   return (
        <SkuSalesBuyPage
          navigator={navigator}
          message={route.message} 
          customerId={route.customerId}/>
      );
  }
   if (routeId === 'SkuSalesBuyDetail')  {
   return (
        <SkuSalesBuyDetail
          navigator={navigator} 
          customerId={route.customerId}/>
      );
  }
   if (routeId === 'SkuSalesConfirm')  {
   return (
        <SkuSalesConfirm
          navigator={navigator}
          message={route.message}
          customerId={route.customerId}
          scaneData={route.scaneData}/>
      );
  }
   if (routeId === 'SkuSalesInputPage')  {
   return (
        <SkuSalesInputPage
          navigator={navigator}
          Phone={route.Phone} />
      );
  }

  if (routeId === 'SkuOrderPage')  {
   return (
        <SkuOrderPage
          navigator={navigator} />
      );
  }
  if (routeId === 'LibrayDetail')  {
   return (
        <LibrayDetail
          navigator={navigator}
          title={route.title}
          book={route.book}/>
      );
  }
  
  if (routeId === 'SurvyDetail')  {
   return (
        <SurvyDetail
          navigator={navigator}
          title={route.title}
          survy={route.survy}/>
      );
  }
  
  if (routeId === 'SkuArravieDetail')  {
   return (
        <SkuArravieDetail
          navigator={navigator}
          title={route.title}
          skuArravieItem={route.skuArravieItem}/>
      );
  }
   if (routeId === 'SkuArravieConfirm')  {
   return (
        <SkuArravieConfirm
          navigator={navigator}
          message={route.message}
          scaneData={route.scaneData}/>
      );
  }
  
  if (routeId === 'StoreDetail')  {
   return (
        <StoreDetail
          navigator={navigator}
          title={route.title}
          storeItem={route.storeItem}/>
      );
  }
  
  if (routeId === 'StorePointPage')  {
   return (
        <StorePointPage
          navigator={navigator}
          title={route.title}/>
      );
  }
  if (routeId === 'ChangePwd')  {
   return (
        <ChangePwd
          navigator={navigator}
          title={route.title}/>
      );
  }
 
  
    if (routeId === 'SweepPage')  {
   return (
        <SweepPage
          navigator={navigator}/>
      );
  }
  if (routeId === 'SweepDetail')  {
   return (
        <SweepDetail
          navigator={navigator}
           title={route.title}
          message={route.message}/>
      );
  }
   if (routeId === 'SweepConfirm')  {
   return (
        <SweepConfirm
          navigator={navigator}
          message={route.message}
          scaneData={route.scaneData}
          Order={route.Order}/>
      );
  }
  if (routeId === 'ReportPage')  {
   return (
        <ReportPage
          navigator={navigator}/>
      );
  }
  if (routeId === 'ReportDetail')  {
   return (
        <ReportDetail
          navigator={navigator}
           title={route.title}
          message={route.message}/>
      );
  }
    return this.noRoute(navigator);
  }
  
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>请在 index.js 的 renderScene 中配置这个页面的路由</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('redemo', () => redemo);

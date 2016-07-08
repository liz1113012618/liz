/*!
 *
 * Util模块 React Native module
 * 主要提供工具方法
 *
 */
var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  PixelRatio,
  View,
  } = React;

module.exports = {
  /*最小线宽*/
  pixel: 2 / PixelRatio.get(),

  /*屏幕尺寸*/
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  /**
   * 基于fetch的get方法
   * @method post
   * @param {string} url
   * @param {function} callback 请求成功回调
   */
  get: function(url, successCallback, failCallback){
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err){
          if(failCallback!=undefined){
            failCallback(err);
          }else{
            //AlertIOS.alert('出错了',err);
          }
      });
  },
  post:function(url,data,successCallback,failCallback){
    var fetchOptions = {
      method: 'POST',
      headers: {
        //'Accept': 'application/json',
        //"Content-Type": "text/plain",
        'Content-Type': 'application/json'
      },
      //mode:'cors',
      body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      successCallback(JSON.parse(responseText));
    })
    .catch(function(err){
      if(failCallback!=undefined){
        failCallback(err);
      }else{
        //AlertIOS.alert('出错了',err);
      }

    });
  },
  /*loading效果*/
  //loading: <ActivityIndicatorIOS color="#3E00FF" style={{marginTop:60,marginLeft:parseInt(Dimensions.get('window').width)/2}}/>,
  loading:<View style={{height:Dimensions.get('window').height*2/3, justifyContent:'center', alignItems:'center'}}></View>
};

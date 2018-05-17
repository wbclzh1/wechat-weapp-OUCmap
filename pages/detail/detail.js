var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

Page({
  data: {
    steps: {}
  },
  onLoad: function(msg) {
    var that = this;
    var key = config.Config.key;
    console.log(msg)
    var myAmapFun = new amapFile.AMapWX({key: '17cb5ddef59f569e9d2ecf55a2242100'});
    var zuobiao = msg.msg.split("U");
    myAmapFun.getWalkingRoute({
      origin: zuobiao[0],
      destination: zuobiao[1],
      success: function(data){
        if(data.paths && data.paths[0] && data.paths[0].steps){
          that.setData({
            steps: data.paths[0].steps
          });
        }
          
      },
      fail: function(info){

      }
    })
  }
})
//detail.js
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
Page({
  data: {
    steps: {}
  },
  onLoad: function(e) {
    var that = this;
    var zuobiao = e.msg.split("U"); //接收始发地与目的地的经纬度    
    //高德步行导航接口
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: '17cb5ddef59f569e9d2ecf55a2242100' });
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
      fail: function (info) {
        //没有收到回传值或者没有执行成功的提示
        wx.showToast({
          title: '网络错误!',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  }
})
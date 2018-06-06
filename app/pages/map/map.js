var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var base64 = require("../../img/base64");
const app = getApp();

Page({
    data: {
        markers: [],
        distance: '',
        cost: '',
        polyline: [],
        hasLocation: false,
        location: {
          name: '当前位置',
          longitude: '',
          latitude: ''
        }, //始发地点
        destination: [], //目的地点
        midpoint: {},
        expot: ["NULL", "NULL", "NULL"] //记录当前始发地or目的地        
    },

    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    onLoad: function(e) {
        console.log('onLoad')        

        //确定当前始发地与目的地位置
        var pot = e.pot.split(",");
        var expot = e.expot.split(",");
        var that = this;
        that.setData({
          icon: base64.icon20,
          expot: expot
        });
        if (e.flag == 0) {
          that.setData({
            location: {
              name: that.data.expot[0],
              longitude: that.data.expot[2],
              latitude: that.data.expot[1]
            },
            destination: {
              0: pot[0],
              2: pot[2],
              1: pot[1]
            }
          });
        };
        if (e.flag == 1) {
          that.setData({
            destination: {
              0: that.data.expot[0],
              2: that.data.expot[2],
              1: that.data.expot[1]
            },
            location: {
              name: pot[0],
              longitude: pot[2],
              latitude: pot[1]
            }
          });
        }
        
        //确定当前位置
        wx.getLocation({
          type: 'gcj02',
            success: function(res) {
                console.log(res);
                if (that.data.location.name == '当前位置'){
                  that.setData({
                    location: {
                      name: '当前位置',
                      longitude: res.longitude,
                      latitude: res.latitude
                    }
                  });
                }
                var midp = {
                  latitude: (parseFloat(that.data.location.latitude) + parseFloat(that.data.destination[1])) * 0.5,
                  longitude: (parseFloat(that.data.location.longitude) + parseFloat(that.data.destination[2])) * 0.5
                }
                that.setData({
                    hasLocation: true,
                    markers: [{
                      iconPath: "../../img/mapicon_navi_s.png",
                      id: 0,
                      latitude: that.data.location.latitude,
                      longitude: that.data.location.longitude,
                      width: 23,
                      height: 33
                    }, {
                      iconPath: "../../img/mapicon_navi_e.png",
                      id: 0,
                      latitude: that.data.destination[1],
                      longitude: that.data.destination[2],
                      width: 24,
                      height: 34
                    }],
                    midpoint: midp
                });

                //高德API路线规划接口
                var key = config.Config.key;
                var myAmapFun = new amapFile.AMapWX({ key: app.globalData.mapkey });
                myAmapFun.getWalkingRoute({
                  origin: that.data.location.longitude + ',' + that.data.location.latitude,
                  destination: that.data.destination[2] + ',' + that.data.destination[1],
                  success: function (data) {
                    console.log(data)
                    var points = [];
                    if (data.paths && data.paths[0] && data.paths[0].steps) {
                      var steps = data.paths[0].steps;
                      for (var i = 0; i < steps.length; i++) {
                        var poLen = steps[i].polyline.split(';');
                        for (var j = 0; j < poLen.length; j++) {
                          points.push({
                            longitude: parseFloat(poLen[j].split(',')[0]),
                            latitude: parseFloat(poLen[j].split(',')[1])
                          })
                        }
                      }
                    }
                    that.setData({
                      polyline: [{
                        points: points,
                        color: "#0091ff",
                        width: 6
                      }]
                    });
                    if (data.paths[0] && data.paths[0].distance) {
                      that.setData({
                        distance: data.paths[0].distance + '米'
                      });
                    }
                    if (data.paths[0] && data.paths[0].duration) {
                      that.setData({
                        cost: parseInt(data.paths[0].duration / 60) + '分钟'
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
    },
    goDetail: function() {
      //转入详情页面
      var that = this;
      var url = '../detail/detail?msg=' + that.data.location.longitude + ',' + that.data.location.latitude + 'U' + that.data.destination[2] + ',' + that.data.destination[1];
        wx.navigateTo({
          url: url
        })
    }
});
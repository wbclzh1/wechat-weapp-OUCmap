var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var base64 = require("../../img/base64");

Page({
    data: {
        markers: [],
        distance: '',
        cost: '',
        polyline: [],
        flag: 0,
        userInfo: {},
        hasLocation: false,
        location: {
          name: '当前位置',
          longitude: '',
          latitude: ''
        },
        destination: [],
        expot: ["NULL", "NULL", "NULL"]
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    onLoad: function(pott) {
        console.log('onLoad')
        console.log(pott)
        var kpot = pott.pot.split(",");
        var kexp = pott.expot.split(",");
        console.log('flag', pott.flag)
        this.setData({
          icon: base64.icon20
        });
        var that = this;
        that.setData({
          expot: kexp,
          destination: {
            0: kpot[0],
            2: kpot[2],
            1: kpot[1]
          }
        });
        
        if (that.data.expot[0] != 'undefined'){
          if (pott.flag == 0){
            that.setData({
              location: {
                name: that.data.expot[0],
                longitude: that.data.expot[2],
                latitude: that.data.expot[1]
              },
              destination: {
                0: kpot[0],
                2: kpot[2],
                1: kpot[1]
              }
            });
            
            console.log('保持location', that.data.location)
            console.log('当前destination', that.data.destination)
          }
          if (pott.flag == 1) {
            that.setData({
              destination: {
                0: that.data.expot[0],
                2: that.data.expot[2],
                1: that.data.expot[1]
              },
              location: {
                name: kpot[0],
                longitude: kpot[2],
                latitude: kpot[1]
              }
            });
            console.log('保持destination', that.data.destination)
            console.log('当前location', that.data.location)
          }


        }
        
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
                //更新数据
                that.setData({
                    userInfo: userInfo,
                })
            }),
        wx.getLocation({
          type: 'gcj02',
            success: function(res) {
                console.log(res)                
                if (that.data.location.name == '当前位置'){
                  that.setData({
                    //destination: pot,
                    location: {
                      name: '当前位置',
                      longitude: res.longitude,
                      latitude: res.latitude
                    }
                  })
                  console.log("返回当前位置！！")         
                  console.log(that.data.destination, that.data.location)
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
                    }]
                })
                var key = config.Config.key;
                var qidian = that.data.location.longitude + ',' + that.data.location.latitude;
                var zhongdian = that.data.destination[2] + ',' + that.data.destination[1];
                var myAmapFun = new amapFile.AMapWX({ key: '17cb5ddef59f569e9d2ecf55a2242100' });
                myAmapFun.getWalkingRoute({
                    origin: qidian,
                    destination: zhongdian,
                    success: function(data) {
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
                    fail: function(info) {

                    }
                })
            }
        })
    },
    goDetail: function() {
      var that = this;
      var url = '../detail/detail?msg=' + that.data.location.longitude + ',' + that.data.location.latitude + 'U' + that.data.destination[2] + ',' + that.data.destination[1];
        wx.navigateTo({
          url: url
        })
    }
})

var app = getApp()
Page({
    data: {

    },

    onLoad: function() {

    }
})
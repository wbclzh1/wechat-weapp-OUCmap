var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
const app = getApp();

Page({
  data: {
    posname: '',
    inputShowed: false,
    inputVal: '',
    text: '',
    resnum: 0,
    result: [], //查询结果列表
    flag: 0,    
    expot: ''  //记录当前始发地or目的地
  },

  onLoad: function (flagg) {
    //接收当前始发地or目的地
    var that = this;
    var k = flagg.epna + ',' + flagg.epla + ',' + flagg.eplo;
    that.setData({
      flag: flagg.flag,
      expot: k
    });
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: '',
      result: [],
      inputShowed: false
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: ''
    });
  },

  inputTyping: function (e) {
    var that = this;
    this.setData({
      inputVal: e.detail.value,
      posname: e.detail.value
    });

    //向后台发送请求
    wx.request({
      url: app.globalData.serverurl,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        name: that.data.posname,
        sym: 'all' //全表查询
      },
      success: function (res) {
        that.setData({
          value: res,
          text: res.data
        })

        //将结果分割，存入result
        var s1 = that.data.text;
        if (s1 != '*') {
          var s2 = s1.split("&");
          var s3 = new Array();
          for (var i = 1; i <= s2[0]; i++) {
            s3[i-1] = s2[i].split("#");
          }
          that.setData({
            resnum: s2[0],
            result: s3,
          })
        }
        else{
          that.setData({
            resnum: 0,
            result: []
          });
        }        
      },
      fail: function () {        
        //没有收到回传值或者没有执行成功的提示
        wx.showToast({
          title: '网络错误!',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  },
  Judge: function (e) {
    //判断始发地与目的地是否相同
    var goingto = e.target.dataset.pot;
    var that = this;
    var nowat = that.data.expot.split(",");
    if (nowat[0] == 'undefined'){
      that.setData({
        flag: '0',
        expot: '当前位置,,'
      });      
    }
    var url = '../map/map?flag=' + that.data.flag + '&pot=' + e.target.dataset.pot + '&expot=' + that.data.expot;
    if (goingto[0] != nowat[0]) {
      //转入地图页面
      wx.navigateTo({
        url: url
      })
    }
    else {
      wx.showModal({
        //显示错误信息
        content: '始发地与目的地相同！',
        showCancel: false,
        success: function (res) {
        }
      })
    }
  }
});
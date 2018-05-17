var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

Page({
  data: {
    posname: '',
    inputShowed: false,
    inputVal: '',
    text: '',
    resnum: 0,
    flag: 0,
    result1: [],
    result2: [{ id:'', name: '', latitude: '', longitude: '' }],
    expot: ''
  },
  onLoad: function (flagg) {
    var that = this;
    var k = flagg.epna + ',' + flagg.epla + ',' + flagg.eplo;
    that.setData({
      flag: flagg.flag,
      expot: k
    });
  }
  ,
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
    wx.request({
      url: 'http://1.oucmaptest.applinzi.com/test.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        name: that.data.posname,
        sym: 'all'
      },
      success: function (res) {/*这个成功后，php回传的值*/
        that.setData({
          value: res,
          text: res.data
        })
        console.log(res);        
        var s1 = that.data.text;
        if (s1 != '*') {
          var s2 = s1.split("&");
          var s3 = new Array();
          var s4 = [{ id: '', name: '', latitude: '', longitude: '' }];
          for (var i = 1; i <= s2[0]; i++) {
            s4[i-1] = { id: '', name: '', latitude: '', longitude: '' };
            s4.length = s4.length + 1;
          }
          for (var i = 1; i <= s2[0]; i++) {
            s3[i] = s2[i].split("#");
            s4[i-1].id = i;
            s4[i-1].name = s3[i][0];
            s4[i-1].latitude = s3[i][1];
            s4[i-1].longitude = s3[i][2];
          }
          that.setData({
            resnum: s2[0],
            result1: s3,
            result2: s4
          })
        }
        else{
          that.setData({
            resnum: 0,
            result1: [],
            result2: [{ id: '', name: '', latitude: '', longitude: '' }]
          });
        }        
      },
      fail: function () {/*这个是PHP没有收到回传值或者没有执行成功的错误提示*/
        wx.showToast({
          title: '网络错误!',
          icon: 'loading',
          duration: 1500
        })
      },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  }
});
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["教学楼", "学院楼", "其他"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    id: 1,
    text: '',
    resnum: 0,
    result1: [
      ["11","11","11"],
      ["第二教学楼", "36.1639430000", "120.4979150000"],
      ["第三教学楼", "36.1640250000", "120.4986180000"],
      ["第四教学楼", "36.1635960000", "120.4992620000"],
      ["第五教学楼", "36.1634490000", "120.4973660000"],
      ["第六教学楼", "36.1628170000", "120.4975590000"],
      ["第七教学楼", "36.1623140000", "120.4977760000"],
      ["第八教学楼", "36.1618070000", "120.4978540000"]      
    ],
    result2: [
      { id: 1, name: "第二教学楼", latitude: "36.1639430000", longitude: "120.4979150000" },
      { id: 2, name: "第三教学楼", latitude: "36.1640250000", longitude: "120.4986180000" },
      { id: 3, name: "第四教学楼", latitude: "36.1635960000", longitude: "120.4992620000" },
      { id: 4, name: "第五教学楼", latitude: "36.1634490000", longitude: "120.4973660000" },
      { id: 5, name: "第六教学楼", latitude: "36.1628170000", longitude: "120.4975590000" },
      { id: 6, name: "第七教学楼", latitude: "36.1623140000", longitude: "120.4977760000" },
      { id: 7, name: "第八教学楼", latitude: "36.1618070000", longitude: "120.4978540000" }
      ]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    var that = this;
    var flag;
    if (e.currentTarget.id == 0) { flag = 'teaching'; }
    if (e.currentTarget.id == 1) { flag = 'institute'; }
    if (e.currentTarget.id == 2) { flag = 'others'; }
    wx.request({
      url: 'http://1.oucmaptest.applinzi.com/test.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        name: 'all',
        sym: flag
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
            s4[i - 1] = { id: '', name: '', latitude: '', longitude: '' };
            s4.length = s4.length + 1;
          }
          for (var i = 1; i <= s2[0]; i++) {
            s3[i] = s2[i].split("#");
            s4[i - 1].id = i;
            s4[i - 1].name = s3[i][0];
            s4[i - 1].latitude = s3[i][1];
            s4[i - 1].longitude = s3[i][2];
          }
          that.setData({
            resnum: s2[0],
            result1: s3,
            result2: s4
          })
        }
        else {
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


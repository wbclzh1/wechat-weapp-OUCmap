var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();

Page({
  data: {
    tabs: ["教学楼", "学院楼", "其他"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    id: 1,
    text: '',
    resnum: 0,
    result: [
      ["第二教学楼", "36.1639430000", "120.4979150000"],
      ["第三教学楼", "36.1640250000", "120.4986180000"],
      ["第四教学楼", "36.1635960000", "120.4992620000"],
      ["第五教学楼", "36.1634490000", "120.4973660000"],
      ["第六教学楼", "36.1628170000", "120.4975590000"],
      ["第七教学楼", "36.1623140000", "120.4977760000"],
      ["第八教学楼", "36.1618070000", "120.4978540000"]      
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

    var flag; //确定当前位置的标志
    if (e.currentTarget.id == 0) { flag = 'teaching'; } //在teaching表中查询
    if (e.currentTarget.id == 1) { flag = 'institute'; } //在institute表中查询
    if (e.currentTarget.id == 2) { flag = 'others'; } //在others表中查询

    //向后台发送请求
    wx.request({
      url: app.globalData.serverurl,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        name: 'all',
        sym: flag
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
        else {
          that.setData({
            resnum: 0,
            result: [],
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
  }
});


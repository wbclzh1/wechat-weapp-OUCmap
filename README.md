# OUC校园导航——基于微信小程序的校园导航系统

## 使用
服务器端使用新浪SAE，需要PHP+MySQL环境，把server目录下的server_oucmaptest.php拷贝至虚拟主机，并修改其中数据库配置信息部分。把server目录下的app_oucmaptest.sql导入数据库。
小程序端需要修改app目录下app.js中的全局变量，serverurl为后台php地址，mapkey为高德KEY。


## 参考资料一览

* [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/)
* [智能社《轻松玩转微信小程序开发》视频课程](https://ke.qq.com/course/182359)
* [w3cschool微信小程序开发教程](https://www.w3cschool.cn/weixinapp/)
* [w3cschool JavaScript开发教程](https://www.w3cschool.cn/javascript/)
* [WeUI for 小程序项目地址](https://github.com/weui/weui-wxss/)
* [WeUI for 小程序 — 使用教程](https://blog.csdn.net/chq1988/article/details/73549027)
* [高德地图微信小程序SDK官方文档](http://lbs.amap.com/api/wx/)
* [高德地图微信小程序SDK应用参考示例](https://github.com/amap-demo/wx-regeo-poiaround-weather)
* [新浪云应用文档中心](http://www.sinacloud.com/doc/sae/index.html)
* [微信公众平台的二次开发 — 快速上手](http://zak7.com/2016/06/30/wechat/)
* [w3cschool PHP开发教程](https://www.w3cschool.cn/php/)
* [w3cschool MySQL开发教程](https://www.w3cschool.cn/mysql/)

## 功能说明

- 选择搜索功能：以外国语学院为例，点击主界面的“选择目的地”按钮，点击顶部导航栏的“学院楼”选栏，向下滑动页面，点击“外国语学院”按钮，即可进入地图界面。
- 输入搜索功能：以东宿舍区为例，点击主界面的“输入目的地”按钮，在输入界面的搜索框中输入“东”，搜索结果显示了名称中含有东字的所有地点，点击“东宿舍区”，即可进入地图界面；在搜索框中输入数据库中不存在的地点名，搜索结果处显示“暂无搜索结果”；在地图界面中点击始发地，重新输入新始发地名称，可修改始发地；在地图界面中点击目的地，重新输入新目的地名称，可修改目的地；修改始发地时，点击搜索结果中的“当前位置”，可令始发地返回当前位置；当输入目的地（或始发地）与当前的始发地（或目的地相同）时，显示弹窗，提示始发地与目的地相同。
- 导航功能：在地图界面中，点击右下方的“详情”按钮，可显示详细带路信息。
- 当由于网络等原因无法正常连接时，显示提示信息。



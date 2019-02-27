//app.js
//app.js
const server = require('/utils/server.js');
App({
  onLaunch: function() {
    var _that = this;
    var _openid = wx.getStorageSync('meetoouser_openid')
    try {
      if (_openid) {
        //不做处理，说明缓存session还在有效期
        //登录拉取用户信息
        wx.request({
          url: server.user_login,
          data: {
            openid: _openid
          },
          success: function(res) {
            if (res.data.code == 200) {
              console.log("用户已登录")
              _that.globalData.userInfo = res.data.data;
            }
          }
        })
      } else {
        wx.login({
          success: function(aes) {
            if (aes.code) {
              wx.request({
                url: server.user_register,
                data: {
                  jsCode: aes.code
                },
                success: function(bes) {
                  if (bes.data.code == 200) {
                    console.log("用户已注册")
                    //设置缓存,有自动时效性
                    wx.setStorageSync('meetoouser_openid', bes.data.data.openid)
                    _that.globalData.userInfo = bes.data.data;
                  }
                },
                fail:function(){
                  console.log(111)
                  wx.showModal({
                    title: '提示',
                    content: '服务异常，请稍后重试！',
                    showCancel: false
                  })
                  return;
                }
              })
            } else {
              console.log('小程序获取用户登录态失败！' + aes.errMsg)
            }
          }
        });
      }
    } catch (e) {
      console.log("登陆失败")
    }
  },
  globalData: {
    userInfo: null
  }
})
//index.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _access = wx.getStorageSync('user_access')
    if (_access) {
      wx.switchTab({
        url: '/pages/moment/moment'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  getUserInfo: function(e) {
    var _that = this
    var _openid = wx.getStorageSync('meetoouser_openid')
    if (e.detail.userInfo) {
      var weinfo = e.detail.userInfo
      //用户按了允许授权按钮
      //更新用户信息
      wx.request({
        url: server.user_access,
        data: {
          openid: _openid,
          nick: weinfo.nickName,
          avatar: weinfo.avatarUrl,
          sex: weinfo.gender,
          province: weinfo.province,
          city: weinfo.city
        },
        success: function(res) {
          if (res.data.code == 200) {
            console.log("用户已授权")
            //设置已授权缓存
            wx.setStorageSync('user_access', true)
            //设置用户全局信息
            app.globalData.userInfo = res.data.data;
            wx.switchTab({
              url: '/pages/moment/moment'
            })
          }
        },
        fail: function() {
          wx.showModal({
            title: '提示',
            content: '服务异常，请稍后重试！',
            showCancel: false
          })
          return;
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '未授权无法正常使用！',
        showCancel: false
      })
    }
  }
})
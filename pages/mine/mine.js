// pages/mine/mine.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userStatic: null,
    constellations: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var _that = this,
      _userId = app.globalData.userInfo.id,
      _openid = app.globalData.userInfo.openid;
    wx.request({
      url: server.user_login,
      data: {
        openid: _openid
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            userInfo: res.data.data
          })
          app.globalData.userInfo = res.data.data
        }
      }
    })
    wx.request({
      url: server.user_selectUserStatistic,
      data: {
        userId: _userId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            userStatic: res.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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

  gotoMineInfo: function(e) {
    wx.navigateTo({
      url: '/pages/mineInfo/mineInfo'
    })
  },

  /**
   * 用户分享
   */
  onShareAppMessage: function() {
    return {
      title: '邀您开启遇喔时刻！',
      path: '/pages/index/index'
    }
  },

  gotoMoments:function(){
    var _that = this,
      _userId = _that.data.userInfo.id
    wx.navigateTo({
      url: '/pages/userMoments/userMoments?userId=' + _userId
    })
  },

  gotoFollows: function() {
    var _that = this,
      _userId = _that.data.userInfo.id
    wx.navigateTo({
      url: '/pages/userFollows/userFollows?userId=' + _userId
    })
  },

  gotoFans: function() {
    var _that = this,
      _userId = _that.data.userInfo.id
    wx.navigateTo({
      url: '/pages/userFans/userFans?userId=' + _userId
    })
  }
})
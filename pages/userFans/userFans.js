// pages/userFans/userFans.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
    fans: null,
    constellations: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this,
      _userId = options.userId;
    _that.setData({
      userId: _userId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _that = this,
      _userId = _that.data.userId;
    wx.request({
      url: server.user_selectUserFans,
      data: {
        userId: _userId
      },
      success: function (res) {
        if (res.data.code == 200) {
          _that.setData({
            fans: res.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  gotoUserDetail: function (e) {
    wx.navigateTo({
      url: '/pages/userDetail/userDetail?userId=' + e.currentTarget.dataset.userid
    })
  }
})
// pages/userMoments/userMoments.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: null,
    userId: null,
    moments: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this,
      _userId = options.userId;
    _that.setData({
      baseUrl: server.base_url,
      userId: _userId,
    })
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
      _userId = _that.data.userId;
    wx.request({
      url: server.moment_selectUserMoments,
      data: {
        userId: _userId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            moments: res.data.data
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

  gotoMomentDetail: function(e) {
    var _that = this,
      _index = e.currentTarget.dataset.index,
      _momentId = _that.data.moments[_index].meetooMoment.id;
    //更新锚点
    wx.request({
      url: server.moment_saveMomentSee,
      data: {
        momentId: _momentId
      },
      success: function(res) {
        if (res.data.code == 200) {}
      }
    })
    wx.navigateTo({
      url: '/pages/momentDetail/momentDetail?momentId=' + _momentId
    })
  },
})
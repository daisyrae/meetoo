// pages/typeGroup/typeGroup.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: null,
    type: null,
    userInfo: null,
    groups: null,
    typeName: ['情感', '生活', '运动', '影音', '美食', '旅行'],
    typeBg: ['orange', 'olive', 'yellow', 'pink', 'brown', 'cyan']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this,
      _type = options.type;
    _that.setData({
      baseUrl: server.base_url,
      type: _type,
      userInfo: app.globalData.userInfo
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
      _type = _that.data.type;
    wx.request({
      url: server.group_selectByType,
      data: {
        type: _type
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            groups: res.data.data
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

  gotoGroupApply: function () {
    wx.navigateTo({
      url: '/pages/groupApply/groupApply'
    })
  },

  gotoTopic: function (e) {
    var _groupId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/topic/topic?groupId=' + _groupId
    })
  }
})
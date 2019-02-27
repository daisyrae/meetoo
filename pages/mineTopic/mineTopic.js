// pages/mineTopic/mineTopic.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: null,
    groupId: null,
    topics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this,
      _groupId = options.groupId;
    _that.setData({
      baseUrl: server.base_url,
      groupId: _groupId
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
      _groupId = _that.data.groupId,
      _userId = app.globalData.userInfo.id;
    wx.request({
      url: server.topic_selectGroupMyTopic,
      data: {
        groupId: _groupId,
        userId: _userId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            topics: res.data.data
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

  gotoDetail: function(e) {
    wx.navigateTo({
      url: '/pages/topicDetail/topicDetail?topicId=' + e.currentTarget.dataset.id
    })
  },

  deleteTopic: function(e) {
    var _that = this,
      _topicId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除该条话题吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: server.topic_deleteTopic,
            data: {
              topicId: _topicId
            },
            success: function(res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '已删除',
                  icon: 'success',
                  mask: true
                })
                _that.onShow()
              }
            }
          })
        } else if (res.cancel) {}
      }
    })
  }
})
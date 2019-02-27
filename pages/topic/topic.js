// pages/topic/topic.js
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
      _groupId = _that.data.groupId;
    wx.request({
      url: server.topic_selectByGroupId,
      data: {
        groupId: _groupId
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

  refresh: function() {
    this.onShow()
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      })
    }, 2000);
  },

  gotoMyTopic: function(e) {
    var _that = this,
      _groupId = _that.data.groupId;
    wx.navigateTo({
      url: '/pages/mineTopic/mineTopic?groupId=' + _groupId
    })
  },

  gotoTopicPublish: function(e) {
    var _that = this,
      _groupId = _that.data.groupId;
    wx.navigateTo({
      url: '/pages/topicPublish/topicPublish?groupId=' + _groupId
    })
  },

  previewPic: function(e) {
    var _that = this,
      _baseUrl = _that.data.baseUrl,
      _index = e.currentTarget.dataset.index,
      _url = e.currentTarget.dataset.url,
      _topic = _that.data.topics[_index];
    var images = []
    for (var i in _topic.meetooTopicPicList) {
      images.push(_baseUrl + _topic.meetooTopicPicList[i])
    }
    wx.previewImage({
      current: _url, // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    })
  },

  gotoUserDetail: function(e) {
    wx.navigateTo({
      url: '/pages/userDetail/userDetail?userId=' + e.currentTarget.dataset.userid
    })
  },

  gotoDetail: function(e) {
    wx.navigateTo({
      url: '/pages/topicDetail/topicDetail?topicId=' + e.currentTarget.dataset.id
    })
  }
})
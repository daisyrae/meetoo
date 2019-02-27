// pages/topicDetail/topicDetail.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    baseUrl: null,
    topicId: null,
    topic: null,
    focus: false,
    comment: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this,
      _topicId = options.topicId;
    _that.setData({
      userInfo: app.globalData.userInfo,
      baseUrl: server.base_url,
      topicId: _topicId
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
      _topicId = _that.data.topicId;
    wx.request({
      url: server.topic_selectTopicDetail,
      data: {
        topicId: _topicId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            topic: res.data.data
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

  showComment: function() {
    var _that = this
    if (!_that.data.focus) {
      _that.setData({
        focus: true
      })
    }
  },

  loseFocus: function() {
    this.setData({
      focus: false
    })
  },

  saveComment: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },

  commitComment: function() {
    var _that = this,
      _comment = _that.data.comment,
      _userId = _that.data.userInfo.id,
      _topicId = _that.data.topicId;
    if (!_comment.replace(/\s+/g, '')) {
      _that.setData({
        comment: ''
      })
      wx.showToast({
        title: '说点什么吧...',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.request({
      url: server.topic_saveTopicComment,
      data: {
        topicId: _topicId,
        userId: _userId,
        word: _comment
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            comment: ''
          })
          _that.onShow()
        }
      }
    })
  },

  previewPic: function(e) {
    var _that = this,
      _baseUrl = _that.data.baseUrl,
      _url = e.currentTarget.dataset.url,
      _topic = _that.data.topic;
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
  }
})
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: null,
    userInfo: null,
    momentId: null,
    momentModel: null,
    focus: false,
    comment: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this,
      _momentId = options.momentId,
      _systemInfo = wx.getSystemInfoSync();
    _that.setData({
      baseUrl: server.base_url,
      userInfo: app.globalData.userInfo,
      momentId: _momentId,
      windowheight: _systemInfo.windowHeight
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
      _momentId = _that.data.momentId;
    wx.request({
      url: server.moment_selectMomentDetail,
      data: {
        momentId: _momentId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            momentModel: res.data.data
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

  /**
   * 用户分享
   */
  onShareAppMessage: function () {
    return {
      title: '邀您开启遇喔时刻！',
      path: '/pages/index/index'
    }
  },

  saveMomentMark: function() {
    var _that = this,
      _momentId = _that.data.momentId,
      _userId = _that.data.userInfo.id;
    wx.request({
      url: server.moment_saveMomentMark,
      data: {
        momentId: _momentId,
        userId: _userId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.onShow()
        } else {
          wx.showToast({
            title: '您已经喜欢过啦...',
            icon: 'none',
            mask: true
          })
        }
      }
    })
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
      _momentId = _that.data.momentId;
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
      url: server.moment_saveMomentComment,
      data: {
        momentId: _momentId,
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

  previewPhoto: function(e) {
    var _that = this,
      _baseUrl = _that.data.baseUrl,
      _index = e.currentTarget.dataset.index,
      _momentModel = _that.data.momentModel;
    var images = []
    for (var i in _momentModel.meetooMomentPicList) {
      images.push(_baseUrl + _momentModel.meetooMomentPicList[i].url)
    }
    wx.previewImage({
      current: _baseUrl + _momentModel.meetooMomentPicList[_index].url, // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    })
  },

  gotoUserDetail: function(e) {
    wx.navigateTo({
      url: '/pages/userDetail/userDetail?userId=' + e.currentTarget.dataset.userid
    })
  }
})
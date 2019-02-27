// pages/topicPublish/topicPublish.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: null,
    userInfo: null,
    word: '',
    photos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this,
      _groupId = options.groupId;
    _that.setData({
      userInfo: app.globalData.userInfo,
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

  saveWord: function(e) {
    this.setData({
      word: e.detail.value
    })
  },

  /**
   * 选择照片
   */
  chooseImage: function() {
    var _that = this
    var count = _that.data.photos.length
    wx.chooseImage({
      count: 6 - count, //只能选择最多6张图片
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        _that.setData({
          photos: _that.data.photos.concat(res.tempFilePaths)
        })
      }
    })
  },

  /**
   * 移除照片
   */
  removeImage: function(e) {
    var _that = this,
      _idx = e.currentTarget.dataset.index;
    var _photos = _that.data.photos;
    _photos.splice(_idx, 1);
    _that.setData({
      photos: _photos
    })
  },

  /**
   * 发表
   */
  publishMoment: function() {
    var _that = this
    if (!_that.data.word.replace(/\s+/g, '')) {
      _that.setData({
        word: ''
      })
      wx.showToast({
        title: '说点什么吧...',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '发表中...',
      mask: true
    })
    wx.request({
      url: server.topic_publish,
      data: {
        groupId: _that.data.groupId,
        userId: _that.data.userInfo.id,
        topic: _that.data.word
      },
      success: function(res) {
        if (res.data.code == 200) {
          var _topicId = res.data.data.id
          var _photos = _that.data.photos
          var count = _photos.length
          for (var i in _photos) {
            wx.uploadFile({
              url: server.topic_uploadTopicPic,
              filePath: _photos[i],
              name: 'file',
              formData: {
                topicId: _topicId
              },
              success: function(res) {}
            })
            count--
          }
          if (count == 0) {
            wx.hideLoading()
            wx.showToast({
              title: '发表成功！',
            })
            wx.navigateBack({
              delta: -1
            })
          }
        }
      }
    })
  }
})
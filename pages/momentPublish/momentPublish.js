// pages/momentPublish/momentPublish.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    word: '',
    address: '',
    photos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this
    _that.setData({
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
   * 获取当前位置
   */
  getUserLocation: function() {
    var _that = this
    wx.chooseLocation({
      success: function(res) {
        _that.setData({
          address: res.name
        })
      }
    })
  },

  /**
   * 选择照片
   */
  chooseImage: function() {
    var _that = this
    var count = _that.data.photos.length
    wx.chooseImage({
      count: 3 - count, //只能选择最多3张图片
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
      url: server.moment_publish,
      data: {
        userId: _that.data.userInfo.id,
        emotion: _that.data.word,
        address: _that.data.address
      },
      success: function(res) {
        if (res.data.code == 200) {
          var _momentId = res.data.data.id
          var _photos = _that.data.photos
          var count = _photos.length
          for (var i in _photos) {
            wx.uploadFile({
              url: server.moment_uploadPic,
              filePath: _photos[i],
              name: 'file',
              formData: {
                momentId: _momentId
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
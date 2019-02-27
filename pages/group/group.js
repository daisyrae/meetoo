// pages/group/group.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    groups: [{
        title: '情感',
        name: 'emotion',
        color: 'orange',
        icon: 'emoji'
      },
      {
        title: '生活',
        name: 'life',
        color: 'olive',
        icon: 'goods'
      },
      {
        title: '运动',
        name: 'sport',
        color: 'yellow',
        icon: 'activity'
      },
      {
        title: '影音',
        name: 'media',
        color: 'pink',
        icon: 'record'
      },
      {
        title: '美食',
        name: 'food',
        color: 'brown',
        icon: 'shop'
      },
      {
        title: '旅行',
        name: 'travel',
        color: 'cyan',
        icon: 'footprint'
      }
    ],
    windowheight: null,
    scrollTopNews: 0,
    news: null,
    scrollTopOnes: 0,
    ones: null,
    songList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this,
      _systemInfo = wx.getSystemInfoSync();
    _that.setData({
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
    var _that = this
    wx.request({
      url: server.open_ones,
      success: function(res) {
        if (res.statusCode == 200) {
          _that.setData({
            ones: res.data.data
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
   * 切换页签
   */
  tabSelect: function(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.id
    })
  },

  gotoGroupApply: function() {
    wx.navigateTo({
      url: '/pages/groupApply/groupApply'
    })
  },

  /**
   * 滚动滑屏
   */
  scroll: function(e) {
    var _that = this,
      _tabIndex = _that.data.tabIndex;
    if (1 == _tabIndex) {
      _that.setData({
        scrollTopNews: e.detail.scrollTop
      })
    } else {
      _that.setData({
        scrollTopOnes: e.detail.scrollTop
      })
    }
  },

  /**
   * 图片预览
   */
  previewImage: function(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url]
    })
  }
})
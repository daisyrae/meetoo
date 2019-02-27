// pages/moment/moment.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    baseUrl: null,
    newMoments: null,
    hotMoments: null,
    newIndex: 1,
    hotIndex: 1,
    userInfo: null,
    windowheight: null,
    scrollNewTop: 0,
    scrollHotTop: 0,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this,
      _systemInfo = wx.getSystemInfoSync();
    _that.setData({
      baseUrl: server.base_url,
      userInfo: app.globalData.userInfo,
      windowheight: _systemInfo.windowHeight
    })
    _that.refreshNewMoments()
    _that.refreshHotMoments()
  },

  refresh: function() {
    var _that = this
    _that.setData({
      loading: true
    })
    if (0 == _that.data.tabIndex) {
      setTimeout(function() {
        _that.refreshNewMoments()
        _that.setData({
          loading: false,
          scrollNewTop: 0
        })
      }, 1000);
    } else {
      setTimeout(function() {
        _that.refreshHotMoments()
        _that.setData({
          loading: false,
          scrollHotTop: 0
        })
      }, 1000);
    }
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

  /**
   * 加载最新
   */
  refreshNewMoments: function() {
    var _that = this
    wx.request({
      url: server.moment_selectNewMoment,
      data: {
        pageNo: 1,
        pageSize: 10
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            newIndex: 1,
            newMoments: res.data.data
          })
        }
      }
    })
  },

  /**
   * 加载最热
   */
  refreshHotMoments: function() {
    var _that = this
    wx.request({
      url: server.moment_selectHotMoment,
      data: {
        pageNo: 1,
        pageSize: 10
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            hotIndex: 1,
            hotMoments: res.data.data
          })
        }
      }
    })
  },

  /**
   * tab切换事件
   */
  tabSelect: function(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.id
    })
  },

  /**
   * 滚动事件
   */
  scroll: function(e) {
    var _that = this
    if (0 == _that.data.tabIndex) {
      _that.setData({
        scrollNewTop: e.detail.scrollTop
      })
    } else {
      _that.setData({
        scrollHotTop: e.detail.scrollTop
      })
    }
  },

  /**
   * 发布跳转
   */
  publishMoment: function() {
    wx.navigateTo({
      url: '/pages/momentPublish/momentPublish'
    })
  },

  /**
   * 加载更多
   */
  loadMore: function() {
    var _that = this,
      _tabIndex = _that.data.tabIndex,
      _newIndex = _that.data.newIndex,
      _hotIndex = _that.data.hotIndex,
      _rpcUrl, _pageNo;
    if (0 == _tabIndex) {
      _rpcUrl = server.moment_selectNewMoment
      _pageNo = _newIndex + 1
    } else {
      _rpcUrl = server.moment_selectHotMoment
      _pageNo = _hotIndex + 1
    }
    wx.request({
      url: _rpcUrl,
      data: {
        pageNo: _pageNo,
        pageSize: 10
      },
      success: function(res) {
        if (res.data.code == 200) {
          if (res.data.data && res.data.data.length > 1) {
            if (0 == _tabIndex) {
              _that.setData({
                newMoments: _that.data.newMoments.concat(res.data.data),
                newIndex: _pageNo
              })
            } else {
              _that.setData({
                hotMoments: _that.data.hotMoments.concat(res.data.data),
                hotIndex: _pageNo
              })
            }
          } else {
            wx.showToast({
              title: '没有更多了...',
              icon: 'none',
              mask: true
            })
          }
        }
      }
    })
  },

  gotoMomentDetail: function(e) {
    var _that = this,
      _tabIndex = _that.data.tabIndex,
      _newMoments = _that.data.newMoments,
      _hotMoments = _that.data.hotMoments,
      _index = e.currentTarget.dataset.index,
      _momentId;
    if (0 == _tabIndex) {
      _momentId = _newMoments[_index].meetooMoment.id
    } else {
      _momentId = _hotMoments[_index].meetooMoment.id
    }
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

  gotoUserDetail: function(e) {
    wx.navigateTo({
      url: '/pages/userDetail/userDetail?userId=' + e.currentTarget.dataset.userid
    })
  }
})
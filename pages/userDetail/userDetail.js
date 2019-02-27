// pages/userDetail/userDetail.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
    userInfo: null,
    userStatic: null,
    selfUser: null,
    constellations: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    isFan: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this,
      _userId = options.userId;
    _that.setData({
      userId: _userId,
      selfUser: app.globalData.userInfo
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
      url: server.user_getUserInfo,
      data: {
        userId: _userId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            userInfo: res.data.data
          })
        }
      }
    })
    wx.request({
      url: server.user_selectUserStatistic,
      data: {
        userId: _userId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            userStatic: res.data.data
          })
        }
      }
    })
    wx.request({
      url: server.user_isFan,
      data: {
        fanUserId: _that.data.selfUser.id,
        followUserId: _userId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            isFan: true
          })
        } else {
          _that.setData({
            isFan: false
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
   * 点击关注
   */
  comfirmFan: function() {
    var _that = this,
    _fanUserId = _that.data.selfUser.id,
    _followUserId = _that.data.userId;
    wx.request({
      url: server.user_saveUserRelation,
      data: {
        fanUserId: _fanUserId,
        followUserId: _followUserId
      },
      success: function (res) {
        if (res.data.code == 200) {
          _that.onShow()
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            mask: true
          })
        }
      }
    })
  },

  disabledFan:function(){
    var _that = this,
      _fanUserId = _that.data.selfUser.id,
      _followUserId = _that.data.userId;
    wx.request({
      url: server.user_deleteRelation,
      data: {
        fanUserId: _fanUserId,
        followUserId: _followUserId
      },
      success: function (res) {
        if (res.data.code == 200) {
          _that.onShow()
          wx.showToast({
            title: '已取消关注！',
            icon: 'none',
            mask: true
          })
        }
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url]
    })
  },

  gotoMoments: function () {
    var _that = this,
      _userId = _that.data.userId
    wx.navigateTo({
      url: '/pages/userMoments/userMoments?userId=' + _userId
    })
  },

  gotoFollows: function () {
    var _that = this,
      _userId = _that.data.userId
    wx.navigateTo({
      url: '/pages/userFollows/userFollows?userId=' + _userId
    })
  },

  gotoFans: function () {
    var _that = this,
      _userId = _that.data.userId
    wx.navigateTo({
      url: '/pages/userFans/userFans?userId=' + _userId
    })
  }
})
// pages/mineGroup/mineGroup.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: null,
    userInfo: null,
    tabIndex: 0,
    allGroups: null,
    myGroups: null,
    typeName: ['情感', '生活', '运动', '影音', '美食', '旅行'],
    typeBg: ['orange', 'olive', 'yellow', 'pink', 'brown', 'cyan']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this
    _that.setData({
      baseUrl: server.base_url,
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
      _userId = _that.data.userInfo.id;
    wx.request({
      url: server.group_selectUserGroups,
      data: {
        userId: _userId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            allGroups: res.data.data
          })
        }
      }
    })
    wx.request({
      url: server.group_selectMineGroups,
      data: {
        userId: _userId
      },
      success: function(res) {
        if (res.data.code == 200) {
          _that.setData({
            myGroups: res.data.data
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

  removeGroup: function(e) {
    var _that = this,
      _groupId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定解散该圈子吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: server.group_deleteGroup,
            data: {
              groupId: _groupId
            },
            success: function (res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '已解散该圈子',
                  icon: 'success',
                  mask: true
                })
                _that.onShow()
              }
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  gotoTopic:function(e){
    var _groupId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/topic/topic?groupId='+_groupId
    })
  }
})
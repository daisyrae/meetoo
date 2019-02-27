// pages/mineInfo/mineInfo.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    cs_index: 1,
    constellations: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    signature: '',
    nick: '',
    sex: '',
    region: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
      _openid = app.globalData.userInfo.openid;
    wx.request({
      url: server.user_login,
      data: {
        openid: _openid
      },
      success: function (res) {
        if (res.data.code == 200) {
          _that.setData({
            userInfo: res.data.data,
            cs_index: res.data.data.constellation,
            signature: res.data.data.signature,
            nick: res.data.data.nick,
            sex: res.data.data.sex,
            region: [res.data.data.province ? res.data.data.province : '', res.data.data.city ? res.data.data.city : '']
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

  switchSex: function(e) {
    var _sex = e.detail.value ? 1 : 2
    this.setData({
      sex: _sex
    })
  },

  constellationChange: function(e) {
    this.setData({
      cs_index: Number(e.detail.value) + 1
    })
  },

  regionChange: function(e) {
    this.setData({
      region: [e.detail.value[0], e.detail.value[1]]
    })
  },

  saveNick: function(e) {
    this.setData({
      nick: e.detail.value
    })
  },

  saveSignature: function(e) {
    this.setData({
      signature: e.detail.value
    })
  },

  comfirmProfile: function() {
    var _that = this,
      _cIndex = _that.data.cs_index;
    if (!_that.data.nick || !_that.data.signature) {
      wx.showToast({
        title: '请填写完资料项！',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.request({
      url: server.user_updateProfile,
      data: {
        id: _that.data.userInfo.id,
        constellation: _cIndex,
        signature: _that.data.signature,
        sex: _that.data.sex,
        nick: _that.data.nick,
        province: _that.data.region[0],
        city: _that.data.region[1]
      },
      success: function(res) {
        if (res.data.code == 200) {
          wx.navigateBack({
            delta: -1
          })
        }
      }
    })
  }
})
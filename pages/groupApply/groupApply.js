// pages/groupApply/groupApply.js
const app = getApp()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeIndex: 0,
    types: ['情感', '生活', '运动', '影音', '美食', '旅行'],
    tagIndex: 0,
    tags: [
      ['励志', '感悟', '心情'],
      ['工作', '聚会', '娱乐'],
      ['球类', '游戏', '休闲'],
      ['音乐', '电影', '漫画'],
      ['料理', '口味', '推荐'],
      ['发现', '攻略', '游记']
    ],
    showModal: false,
    groupName: '',
    tagName: '',
    intro: '',
    userInfo: null
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

  saveGroupName:function(e){
    this.setData({
      groupName: e.detail.value
    })
  },

  saveTagName:function(e){
    this.setData({
      tagName: e.detail.value
    })
  },

  saveIntro:function(e){
    this.setData({
      intro: e.detail.value
    })
  },

  pickerChange: function(e) {
    var _that = this,
      _typeIndex = _that.data.typeIndex;
    if (_typeIndex == e.detail.value) {
      return
    }
    this.setData({
      typeIndex: e.detail.value,
      tagIndex: 0,
      tagName: ''
    })
  },

  showModal: function(e) {
    var _that = this
    if (!_that.data.showModal) {
      _that.setData({
        showModal: true
      })
    }
  },

  hideModal(e) {
    this.setData({
      showModal: false
    })
  },

  modalNormal: function(e) {},

  chooseTag: function(e) {
    this.setData({
      tagIndex: e.currentTarget.dataset.index
    })
  },

  confirmTag: function() {
    var _that = this,
      _typeIndex = _that.data.typeIndex,
      _tagIndex = _that.data.tagIndex,
      _tagName = _that.data.tags[_typeIndex][_tagIndex];
    _that.setData({
      tagName: _tagName,
      showModal: false
    })
  },

  confirmGroupApply: function(e) {
    var _that = this,
      _groupName = _that.data.groupName,
      _tagName = _that.data.tagName,
      _intro = _that.data.intro;
    if (!_groupName || !_tagName || !_intro) {
      wx.showToast({
        title: '请填写完资料项！',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.request({
      url: server.group_saveGroup,
      data: {
        userId: _that.data.userInfo.id,
        groupName: _that.data.groupName,
        type: _that.data.typeIndex,
        tag: _that.data.tagName,
        intro: _that.data.intro
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.navigateBack({
            delta: -1
          })
        }
      }
    })
  }
})
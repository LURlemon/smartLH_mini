// pages/user/center/center.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userId: app.globalData.userId,
    orgName: '欢迎使用',
    avatarUrl: '/image/avatar.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.setData({
      avatarUrl: app.globalData.avatarUrl
    })

    if (app.globalData.orgName != "" && app.globalData.orgName != null) {
      this.setData({
        orgName: app.globalData.orgName
      })
    }

    console.log(this.data.orgStatus)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow() {
    console.log(this.getTabBar(), Object)
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    var that = this;
    this.setData({
      orgName: app.globalData.orgName,
    })

  },

  openPage: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
})
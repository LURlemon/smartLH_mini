// pages/organization/aduitState/aduitState.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audit: -1,  //0：待审核；1：审核通过；2：审核失败

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + 'Organization/getOrgInfo',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        orgId: app.globalData.orgId
      },
      success(res) {
        console.log(res.data.data.audit);
        that.setData({
          organization: res.data.data,
          audit: res.data.data.audit
        })
      },
    })
  },

  bindBuild: function (e) {
    wx.navigateTo({
      url: '../orgAudit/reAudit/reAudit',
    })
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

  }
})
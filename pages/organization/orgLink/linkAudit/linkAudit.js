// pages/organization/orgLink/linkAudit/linkAudit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //顶部选项栏内容数组
    swiperNav: [
      {
        tabName: '待审核',
        cond: true
      },
      {
        tabName: '已审核',
        cond: false
      }],
    auditList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.request(3);

  },

  request: function (status) {
    console.log(status)
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + 'WxOrg/getAuditList',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        orgId: app.globalData.orgId,
        status: status
      },
      success(res) {
        console.log(res.data)
        that.setData({
          auditList: res.data.data
        })
      }
    })
  },

  //顶部选项栏切换函数
  swiperNav: function (e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    var arr = this.data.swiperNav;
    for (let i = 0; i < arr.length; i++) {
      if (i == index) {
        arr[i].cond = true;
      } else {
        arr[i].cond = false;
      }
    }
    this.setData({
      swiperNav: arr
    })

    var that = this;
    if (this.data.swiperNav[0].cond) {
      that.request(3)
    }else{
      that.request(2)
    }

  },

  bindAudit: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset);
    var type = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var tips;
    var status;
    if (type == 'y') {
      tips = "您确定通过吗？"
      status = 2
    };
    if (type == 'n') {
      tips = "您确定拒绝吗？"
      status = 4
    };

    wx.showModal({
      title: tips,
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + 'WxOrg/wxAudit',
            method: 'GET',
            header: {
              'content-type': 'application/json', // 默认值
              'X-token': app.globalData.token
            },
            data: {
              id: id,
              status: status,
              orgName: app.globalData.orgName
            },
            success(res) {
              console.log(res.data)
              that.onLoad()

            }
          })
        }
      }
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
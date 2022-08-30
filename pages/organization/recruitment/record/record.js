// pages/organization/recruitment/record/record.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    swiperNav: [{
        tabName: '我的发布',
        cond: true
      },
      {
        tabName: '所有发布',
        cond: false
      }
    ],

    recruitments: [],
    tips: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showToast({
      icon: 'none',
      title: '长按删除',
      duration: 500
    })
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + 'WxOrg/getRecByWxOrgId',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        orgId: app.globalData.orgId,
        wxOrgId: app.globalData.wxId,
      },
      success(res) {
        console.log(res.data)

        that.setData({
          recruitments: res.data.data
        })
      }
    })

  },

  request: function (e) {
    wx.showToast({
      icon: 'none',
      title: '长按删除',
      duration: 500
    })
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + 'Recruitment/getRecListByOrgId',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        orgId: app.globalData.orgId
      },

      success(res) {
        console.log(res.data)
        if (res.data.code == 7) {
          that.setData({
            tips: res.data.message
          })
        }
        that.setData({
          recruitments: res.data.data
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
      that.onLoad()
    } else {
      that.request()
    }

  },

  selectRec: function (e) {
    var recId = e.currentTarget.dataset.id;
    console.log(recId);
    wx.navigateTo({
      url: '../modify/modify?recId=' + recId,
    })
  },

  deleteRec: function (e) {
    var that = this;
    var recId = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title
    console.log(recId)
    wx.showModal({
      title: '删除需求信息',
      content: "确定要删除标题为 “" + title + "” 的人才需求信息吗？",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + 'Recruitment/deleteRecruit',
            method: 'GET',
            header: {
              'content-type': 'application/json', // 默认值
              'X-token': app.globalData.token
            },
            data: {
              recruitmentId: recId
            },
            success(res) {
              console.log(res)
              wx.showToast({
                title: res.data.message,
                duration: 2000
              })

              if (that.data.swiperNav[0].cond) {
                that.onLoad()
              } else {
                that.request()
              }
            }
          })
        }
      }
    })

  },

  deliverList: function (e) {
    var recId = e.currentTarget.dataset.id;
    console.log(recId)
    wx.navigateTo({
      url: '/pages/organization/resumeList/resumeList?recId=' + recId
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
    if (this.data.swiperNav[0].cond) {
      this.onLoad()
    } else {
      this.request()
    }
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
// pages/organization/resumeList/resumeList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deliverList: [],
    isDeliver: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this

    let pages = getCurrentPages(); //页面对象
    let prevpage = pages[pages.length - 2]; //上一个页面对象
    let path = prevpage.route; //上个页面路由url字符串 比如：‘page/prevDetail/prevDetail’
    console.log(path)

    if (path === 'pages/center/center') {

      wx.request({
        url: app.globalData.baseUrl + 'ResumeDeliver/getResumeByOrgId',
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
          if (res.data.data.users == null) {
            that.setData({
              isDeliver: false
            })
          } else {
            if (res.data.data.users.length > 0) {
              that.setData({
                deliverList: res.data.data.users,
                isDeliver: true
              })
            }
          }

        }
      })

    }

    if (path === 'pages/organization/recruitment/record/record') {
      console.log(options.recId)
      var recId = options.recId
      
      wx.request({
        url: app.globalData.baseUrl + 'ResumeDeliver/getByRecruitmentId',
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'X-token': app.globalData.token
        },
        data: {
          recruitmentId: recId
        },
        success(res) {
          console.log(res.data.data.users)
          if (res.data.data.users == null) {
            that.setData({
              isDeliver: false
            })
          } else {
            if (res.data.data.users.length > 0) {
              that.setData({
                deliverList: res.data.data.users,
                isDeliver: true
              })
            }
          }

        }
      })
    }
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
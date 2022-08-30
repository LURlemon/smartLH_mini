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
    isNew: false
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

    wx.request({
      url: app.globalData.baseUrl + 'User/getUserById',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        userId: app.globalData.userId,
      },

      success(res){
        console.log(res.data)
        app.globalData.isSubmit = res.data.data.submit
        if(res.data.data.newNoticeTime == null){
          that.setData({
            isNew: false
          })
        }else{
          if(res.data.data.readNoticeTime == null){
            that.setData({
              isNew: true
            })
          }
          else{
            if(res.data.data.readNoticeTime < res.data.data.newNoticeTime){
              that.setData({
                isNew: true
              })
            }
            else{
              that.setData({
                isNew: false
              })
            }
          }
        }
      }

    })
  },

  openPage: function (e) {
    console.log(app.globalData.isSubmit)
    var url = e.currentTarget.dataset.url;
    var deliverUrl = '/pages/user/deliverList/deliverList'
    if(url == deliverUrl && app.globalData.isSubmit != 1){

      wx.showModal({
        title: '温馨提示',
        content: '请先提交您的个人信息',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/user/userInfo/userInfo'
            })
          }
        }
      })
    }else{
      wx.navigateTo({
        url: url,
      })
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

  },
})
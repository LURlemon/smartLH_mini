// pages/center/notice/notice.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperNav: [
      {
        tabName: '系统通知',
        cond: true
      },
      {
        tabName: '我的消息',
        cond: false
      }],


    notices: [],
    systemMessage: [],
    tips: '',
    state: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.userId)
    console.log(app.globalData.token)
    this.setData({
      state: app.globalData.state
    })
    if(app.globalData.state == 0){
      var id = app.globalData.userId
    }else{
      var id = app.globalData.wxId
    }

    var that = this;
    let list = [];
    wx.request({
      url: app.globalData.baseUrl + 'Notice/getMessage',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        receiverId: id,
        state: app.globalData.state
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 7) {
          that.setData({
            tips: res.data.message
          })
        }
        if(res.data.code == 6){
          for (var i = 0; i < res.data.data.length; i++) {
            var notice = {
              content: res.data.data[i].content,
              isF: false,
              title: res.data.data[i].title,
              sendTime: res.data.data[i].sendTime,
              id: res.data.data[i].id,
            }
            list = list.concat(notice);
          }
          that.setData({
            tips: '',
            notices: list
          })
        }
      }
    })
  },

  request: function (e) {
    var that = this;
    if(app.globalData.state == 0){
      var id = app.globalData.userId
    }else{
      var id = app.globalData.wxId
    }
    wx.request({
      url: app.globalData.baseUrl + 'Notice/getSystemMessage',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        receiverId: id
      },

      success(res) {
        console.log(res.data)
        if (res.data.code == 7 ) {
          that.setData({
            tips: res.data.message,
            notices: []
          })
        }
        if(res.data.code == 6){
          that.setData({
            tips: '',
            notices: res.data.data
          })
        }

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

  change: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var list = this.data.notices;
    console.log(list[index].isF);
    list[index].isF = !list[index].isF;
    console.log(list[index].isF);
    this.setData({
      notices: list
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
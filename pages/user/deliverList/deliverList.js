// pages/user/deliverList/deliverList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered: false,
    isDeliver: false,
    deliverList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    var that =this
    wx.request({
      url: app.globalData.baseUrl + 'ResumeDeliver/getByUserId',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        userId: app.globalData.userId
      },
      success(res){
        console.log(res.data)
        if(res.data.data.resumeDeliverList.length > 0){
          that.setData({
            deliverList: res.data.data.resumeDeliverList,
            isDeliver: true
          })
        }else{
          that.setData({
            isDeliver: false
          })

        }
      }
    })
  },


 //详情
 detail(e) {
  var id = e.currentTarget.dataset.index
  wx.navigateTo({
    url: '/pages/information/detail/detail?id=' + id,
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
    var that =this
    wx.request({
      url: app.globalData.baseUrl + 'ResumeDeliver/getByUserId',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        userId: app.globalData.userId
      },
      success(res){
        console.log(res.data)
        if(res.data.data.resumeDeliverList.length > 0){
          that.setData({
            deliverList: res.data.data.resumeDeliverList,
            isDeliver: true
          })
        }
      }
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

  }
})
// pages/detail/detail.js
var app = getApp()
import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
  },
  //日期格式
  dateForm(nowPositionList){
    let i = 0
    for(;i<nowPositionList.length;i++){
     let index = nowPositionList[i].publish_time.indexOf('T')
     let date = nowPositionList[i].publish_time.slice(0,index)
     let index2 = nowPositionList[i].end_time.indexOf('T')
     let date2 = nowPositionList[i].end_time.slice(0,index2)
      nowPositionList[i].publish_time = date
      nowPositionList[i].end_time = date2
    }
    return nowPositionList
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(options.id)
    let a = await request('/Recruitment/getRecById',{recruitmentId:options.id}, 
    {
      'content-type': 'application/json', // 默认值
      'X-token': app.globalData.token
    })
    this.setData({
      list:a.data,
    })
    console.log(this.data.list)
    console.log(a)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
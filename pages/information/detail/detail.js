// pages/detail/detail.js
var app = getApp()
import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    isDeliver: false,
    isSubmit: 0,
    state: 1,
    resumeDeliverId: null,
    orgPhone: null,
    orgId: null,
    resumeDeliver: {
      id: null,
      userId: null,
      recruitmentId: null,
      recruitmentTitle: null,
      orgId: null,
      orgName: null,
    }
  },


  //日期格式
  dateForm(nowPositionList) {
    let i = 0
    for (; i < nowPositionList.length; i++) {
      let index = nowPositionList[i].publish_time.indexOf('T')
      let date = nowPositionList[i].publish_time.slice(0, index)
      let index2 = nowPositionList[i].end_time.indexOf('T')
      let date2 = nowPositionList[i].end_time.slice(0, index2)
      nowPositionList[i].publish_time = date
      nowPositionList[i].end_time = date2
    }
    return nowPositionList
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var that = this;
    console.log(options.id)
    this.setData({
      ['resumeDeliver.recruitmentId']: options.id,
      ['resumeDeliver.userId']: app.globalData.userId,
      isSubmit: app.globalData.isSubmit
    })
    let a = await request('/Recruitment/getRecById', {
      recruitmentId: options.id
    }, {
      'content-type': 'application/json', // 默认值
      'X-token': app.globalData.token
    })
    this.setData({
      list: a.data,
      state: app.globalData.state,
      ['resumeDeliver.orgId']: a.data.orgId,
      ['resumeDeliver.recruitmentTitle']: a.data.title,
      ['resumeDeliver.orgName']: a.data.orgName,

    })
    console.log(this.data.list)
    console.log(a)

    wx.request({
      url: app.globalData.baseUrl + 'ResumeDeliver/judgeDeliver',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        userId: app.globalData.userId,
        recruitmentId: options.id
      },
      success(res) {
        console.log(res.data)
        if (res.data.data == null) {
          that.setData({
            isDeliver: false
          })
        } else {
          that.setData({
            resumeDeliverId: res.data.data.id,
            isDeliver: true,
            orgId: res.data.data.orgId
          })
          wx.request({
            url: app.globalData.baseUrl + 'Organization/getOrgInfo',
            method: 'GET',
            header: {
              'content-type': 'application/json', // 默认值
              'X-token': app.globalData.token
            },
            data: {
              orgId: res.data.data.orgId
            },
            success(res){
              console.log(res.data)
              that.setData({
                orgPhone: res.data.data.phone
              })
            }
          })
        }
      }
    })

  },

  deliver: function (e) {
    console.log(this.data.resumeDeliver)
    var that = this
    var resumeDeliver = this.data.resumeDeliver
    wx.request({
      url: app.globalData.baseUrl + 'ResumeDeliver/deliver',
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: resumeDeliver,

      success(res) {
        console.log(res.data)
        if(res.data.code == 6){

          that.setData({
            isDeliver: true,
            resumeDeliverId: res.data.data.id,
            orgId: res.data.data.orgId
          })
          wx.showToast({
            title: '投递成功',
          })

          var orgId = res.data.data.orgId
          wx.request({
            url: app.globalData.baseUrl + 'Organization/getOrgInfo',
            method: 'GET',
            header: {
              'content-type': 'application/json', // 默认值
              'X-token': app.globalData.token
            },
            data: {
              orgId: orgId
            },
            success(res){
              console.log(res.data)
              that.setData({
                orgPhone: res.data.data.phone
              })
            }
          })
        }else{
          wx.showToast({
            icon: 'none',
            title: '系统繁忙',
          })
        }
        
      }
    })
  },

  cancelDeliver: function () {
    console.log(this.data.resumeDeliverId)
    var that = this

    wx.showModal({
      title: '温馨提示',
      content: '您确定取消投递吗',
      success(res) {
        if (res.confirm) {

          wx.request({
            url: app.globalData.baseUrl + 'ResumeDeliver/cancel',
            method: 'GET',
            header: {
              'content-type': 'application/json', // 默认值
              'X-token': app.globalData.token
            },
            data: {
              resumeDeliverId: that.data.resumeDeliverId
            },
            success(res) {
      
              if (res.data.code == 6) {
                that.setData({
                  isDeliver: false
                })
                wx.showToast({
                  title: '已取消',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.navigateBack()
                }, 2000)
              } else {
                wx.showToast({
                  icon: 'none',
                  title: '系统繁忙',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })

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
    console.log(this.data.orgId)
    var that = this
    if(this.data.isDeliver){
      wx.request({
        url: app.globalData.baseUrl + 'Organization/getOrgInfo',
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'X-token': app.globalData.token
        },
        data: {
          orgId: this.data.orgId
        },
        success(res){
          console.log(res.data)
          that.setData({
            orgPhone: res.data.data.phone
          })
        }
      })
    }

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
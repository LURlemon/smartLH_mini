// pages/organization/orgLink/change/changeLink.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    wxOrgs:[],
    isfind: Boolean,
    isSearch: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      isfind: true
    })

  },
  bindInput(e) {
    this.setData({
      content: e.detail.value,
    })
  },

  search: function (e) {
    var that = this;
    if(this.data.content != ''){
      this.setData({
        isSearch: true
      })
      wx.request({
        url: app.globalData.baseUrl + 'WxOrg/getChangeList',
        data: {
          content: this.data.content,
          id: app.globalData.wxId,
          orgId: app.globalData.orgId
        },
        header: {
          'content-type': 'application/json', // 默认值
          'X-token': app.globalData.token
        },
        method: 'GET',
        success(res) {
          console.log(res.data)
          console.log(res.data.data.length)
          if (res.data.data.length == 0) {
            that.setData({
              isfind: false,
              wxOrgs: []
            })
          } else {
            that.setData({
              wxOrgs: res.data.data,
              isfind: true
            })
          }
  
        }
      })
    }
    

  },

  bindChange: function (e) {
    var that = this;
    var name = e.currentTarget.dataset.name;
    console.log(e.currentTarget.dataset.name)
    wx.showModal({
      title: '确定要将该单位管理员转让给该用户吗',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + 'WxOrg/changeManager',
            method: 'GET',
            header: {
              'content-type': 'application/json', // 默认值
              'X-token': app.globalData.token
            },
            data: {
              oldId: app.globalData.wxId,
              newId: e.currentTarget.dataset.id,
              orgId: app.globalData.orgId,
              orgName: app.globalData.orgName,
              managerName: name
            },
            success(res) {
              console.log(res.data);
              if(res.data.code == 6){
                wx.showToast({
                  title: '转让成功',
                  duration: 2000,
                  success(res){
                    app.globalData.status = 2,
                    setTimeout(function (){
                      wx.switchTab({
                        url: '../../../center/center',
                      }) 
                    }, 2000)
                  }
                })
              }
              else{
                wx.showToast({
                  title: '系统繁忙',
                  image: '/image/tips.png'
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
// pages/organization/orgLink/orgLink.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    orgs: [
      // {
      //   name: "隆回县组织部",
      //   type: "事业单位",
      //   address: '湖南省隆回县'

      // },
      // {
      //   name: "隆回县组织部",
      //   type: "事业单位",
      //   address: '湖南省隆回县'

      // }
    ],

    isfind: false,
    content: ''


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  inputClick(e){
    wx.showToast({
      icon: 'none',
      title: '机构代码: 统一社会信用代码',
    })
  },

  bindInput(e) {  
    this.setData({
      name: e.detail.value,
      content: e.detail.value,
    })
  },

  search: function (e) {
    console.log(this.data.content);
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + 'WxOrg/getOrgByWxSearch',
      data: {
        content: this.data.content
      },
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.data.data == null) {
          that.setData({
            isfind: true
          })
        } else {
          that.setData({
            orgs: res.data.data
          })
        }

      }
    })

  },

  bindJoin: function (e) {
    var that = this;
    var orgName = e.currentTarget.dataset.orgname;
    console.log(e.currentTarget.dataset.orgname)
    var audit = e.currentTarget.dataset.audit;
    if(audit == 0){
      wx.showModal({
        title: orgName+" 还未通过创建审核，请稍作等待"
      })
    }
    else{
      wx.showModal({
        title: '您确定要加入 '+orgName+' 吗?',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.baseUrl + 'WxOrg/linkOrg',
              method: 'GET',
              header: {
                'content-type': 'application/json', // 默认值
                'X-token': app.globalData.token
              },
              data: {
                id: app.globalData.wxId,
                orgId: e.currentTarget.dataset.id,
                orgName: orgName
              },
              success(res) {
                console.log(res.data);
                wx.showToast({
                  title: '请等待审核',
                  duration: 2000,
                  success(res){
                    wx.switchTab({
                      url: '../../center/center',
                    })
                  }
                })
  
              }
            })
          }
        }
      })
    }
    
    

  },

  bindBuild: function (e) {

    wx.navigateTo({
      url: '../orgAudit/orgAudit',
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
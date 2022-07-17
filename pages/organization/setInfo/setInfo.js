// pages/organization/setInfo/setInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [],
    typeIndex: 0,

    introduction: "",
    currentWord: 0,

    organization: {
      type: "请选择", //单位类型
      name: '',//单位名称
      address: '',
      phone: '',
      material: '', //审核材料，eg：图片
      serialNumber: '', //该单位编号，如企业工商管理号
      introduction: '',
    },

  },


  bindTypeChange: function (e) {
    console.log(e.detail.value)
    var types = this.data.types;
    console.log(types)
    this.setData({
      typeIndex: e.detail.value,
      ['organization.type']: types[e.detail.value]
    })
    console.log(this.data.organization.type)
  },

  /**c
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + 'Organization/getOrgInfo',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        orgId: app.globalData.orgId
      },
      success(res){
        console.log(res);
        that.setData({
          organization: res.data.data
        })
      }
    })
    wx.request({
      url: app.globalData.baseUrl + 'Organization/getTypes',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          types: res.data.data
        })
        console.log(that.data.types);
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

  formInputChange: function (e) {
    console.log(e.detail);
    var type = e.currentTarget.dataset.field;
    var content = e.detail.value;
    console.log("输入类别：" + type)
    var that = this;
    switch (type) {
      case "phone":
        that.setData({
          ['organization.phone']: content
        })
        break;
      case "address":
        that.setData({
          ['organization.address']: content
        })
        break;
      case "serialNumber":
        that.setData({
          ['organization.serialNumber']: content
        })
        break;
    }
    console.log(this.data.organization, Object)
  },

  submit: function () {
    var organization = this.data.organization;
    console.log(organization, Object);
    wx.request({
      url: app.globalData.baseUrl + 'Organization/setOrgInfo',
      method: 'POST',
      header: {
				'content-type': 'application/json', // 默认值
				'X-token': app.globalData.token
      },
      data: organization,
      success(res){
        console.log(res.data);
        var code = res.data.code;
        if(code == 7){
          wx.showToast({
            title: '修改失败',
            duration: 2000
          })
        }
        if(code == 6){
          wx.showToast({
            title: '修改成功',
            duration: 2000
          })
          wx.switchTab({
            url: '../../center/center',
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
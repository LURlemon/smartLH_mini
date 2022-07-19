// pages/organization/setInfo/accountInfo/accountInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxOrg: {
      id: null,
      name: '',
      phone: '',
      mail: ''
    },

    formData: {},
    rules: [{
      name: 'username',
      rules: {
        required: true,
        message: '请输入姓名'
      },
    },{
      name: 'phone',
      rules: [{
        required: true,
        message: '手机号必填'
      }, {
        mobile: true,
        message: '手机号码格式不对'
      }],
    },{
      name: 'mail',
      rules: [{
        required: true,
        message: '请填写邮箱'
      },{
        email: true,
        message: '邮箱格式不对'
      }]
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this

    this.setData({
      ['wxOrg.id']: app.globalData.wxId
    })
    wx.request({
      url: app.globalData.baseUrl + 'WxOrg/getById',
        method: 'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'X-token': wx.getStorageSync('token')
        },
        data: {
          id: app.globalData.wxId,
        },
      
        success(res){
          that.setData({
            wxOrg: res.data.data,
            ['formData.username']: res.data.data.name,
            ['formData.phone']: res.data.data.phone,
            ['formData.mail']: res.data.data.mail,

          })

        }
    })
  },


  formInputChange: function (e) {
    console.log(e.detail);
    var type = e.currentTarget.dataset.field;
    var content = e.detail.value;
    console.log("输入类别：" + type)
    var that = this;
    switch (type) {
      case "name":
        that.setData({
          ['wxOrg.name']: content,
          ['formData.username']: content
        })
        break;
      case "phone":
        that.setData({
          ['wxOrg.phone']: content,
          ['formData.phone']: content
        })
        break;
      case "mail":
        that.setData({
          ['wxOrg.mail']: content,
          ['formData.mail']: content
        })
        break;
    }
    console.log(this.data.user, Object)
  },

  getPhoneNumber(e) {
		console.log(e, Object);
		var ivObj = e.detail.iv
		var telObj = e.detail.encryptedData
		var code = e.detail.code
    var that = this;
    wx.showToast({
      title: '正在获取',
      icon: 'loading',
      duration: 2200
    })
		wx.request({
      url: app.globalData.baseUrl + 'WxOrg/getPhone',
      header: {
				'content-type': 'application/json', // 默认值
				'X-token': wx.getStorageSync('token')
			},
			data: {
				code: code
			},

			success(res) {
				console.log(res, Object);
				console.log(res.data.data.phone_info.phoneNumber)
				var phone = res.data.data.phone_info.phoneNumber;
				that.setData({
          ['wxOrg.phone']: phone,
          ['formData.phone']: phone
				})
			}
		})

  },
  
  submit: function () {

    var that = this;

    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors);
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } 
      else {
        wx.showToast({
          title: '通过校验',
        })

        wx.request({
          url: app.globalData.baseUrl + 'WxOrg/setInfo',
          method: 'POST',
          header: {
            'content-type': 'application/json', // 默认值
            'X-token': wx.getStorageSync('token')
          },
          data: that.data.wxOrg,
          success(res) {
            console.log(res.data);
            app.globalData.phone = res.data.data.phone
            if(res.data.code == 6){
              wx.showToast({
                title: '提交成功',
                duration: 2000
              })
              setTimeout(function () {
                wx.navigateBack();
              }, 2000)
            }else{
              wx.showToast({
                title: '系统繁忙',
                duration: 2000
              })
            }
            
          }
        })
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
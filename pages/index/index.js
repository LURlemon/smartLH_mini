// index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    canIUseGetUserProfile: false,
  },


  onLoad() {
    var that = this;

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  bindUser: function (e) {
    wx.showToast({
      title: '请稍后',
      icon: 'loading',
      duration: 800
    })
    app.globalData.state = 0;
    wx.setStorageSync('state', 0)
    var that = this;
    wx.login({
      timeout: 1000,
      success(res) {
        console.log(res.code)
        if (res.code) {
          wx.request({
            url: app.globalData.baseUrl + 'User/login',
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              code: res.code
            },
            success(res) {
              console.log(res)
              if (res.data.message == '成功') {
                if (res.data.data.user.name != null && res.data.data.user.name != "") {
                  app.globalData.orgName = res.data.data.user.name
                }

                wx.setStorageSync('token', res.data.data.token)
                wx.setStorageSync('userId', res.data.data.user.id)
                app.globalData.userId = res.data.data.user.id;
                app.globalData.token = res.data.data.token;
                app.globalData.isSubmit = res.data.data.user.submit;


                console.log(wx.getStorageSync('userId'))
                console.log(wx.getStorageSync('token'))

                wx.showModal({
                  title: '个人用户登录',
                  content: '正在请求您的个人信息',
                  success(res) {
                    if (res.confirm) {
                      wx.getUserProfile({
                        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                        success: (res) => {
                          console.log(res.userInfo)
                          that.setData({
                            userInfo: res.userInfo,
                          })
                          app.globalData.state = 0
                          app.globalData.userInfo = res.userInfo;
                          app.globalData.avatarUrl = res.userInfo.avatarUrl;
                          wx.navigateTo({
                            url: '/pages/user/welcome/welcome',
                          })
                        }
                      })
                    }
                    return;
                  }
                })
              } else {
                wx.showToast({
                  icon: null,
                  title: '系统繁忙，请稍后',
                  duration: 2000
                })
              }
            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
    })


  },


  bindOrg: function (e) {
    wx.showToast({
      title: '请稍后',
      icon: 'loading',
      duration: 800
    })
    app.globalData.state = 1;
    console.log(app.globalData.orgName)
    wx.setStorageSync('state', 1)
    var that = this;
    wx.login({
      timeout: 1000,
      success(res) {
        console.log(res.code)
        if (res.code) {
          wx.request({
            url: app.globalData.baseUrl + 'WxOrg/wxLogin',
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              code: res.code
            },
            success(res) {
              console.log(res)
              if (res.data.message == '成功') {
                wx.setStorageSync('token', res.data.data.token)
                wx.setStorageSync('wxId', res.data.data.wxOrg.id)
                wx.setStorageSync('orgId', res.data.data.wxOrg.orgId);
                app.globalData.orgStatus = res.data.data.wxOrg.status;
                app.globalData.orgId = res.data.data.wxOrg.orgId;
                app.globalData.wxId = res.data.data.wxOrg.id;
                app.globalData.token = res.data.data.token;
                app.globalData.phone = res.data.data.wxOrg.phone;
                app.globalData.name = res.data.data.wxOrg.name; //该用户的名字

                if (res.data.data.wxOrg.orgName != null && res.data.data.wxOrg.orgName != "") {
                  console.log("test")
                  app.globalData.orgName = res.data.data.wxOrg.orgName;
                }

                console.log(app.globalData.orgName)
                console.log(wx.getStorageSync('wxId'))
                console.log(wx.getStorageSync('token'))
                wx.showModal({
                  title: '单位用户登录',
                  content: '正在请求您的个人信息',
                  success(res) {
                    if (res.confirm) {
                      wx.getUserProfile({
                        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                        success: (res) => {
                          console.log(res.userInfo)
                          that.setData({
                            userInfo: res.userInfo,
                          })
                          app.globalData.state = 1
                          app.globalData.userInfo = res.userInfo;
                          app.globalData.avatarUrl = res.userInfo.avatarUrl;
                          wx.navigateTo({
                            url: '/pages/welcome/welcome',
                          })
                        }
                      })
                    }
                    return;
                  }
                })
              } else {
                wx.showToast({
                  icon: null,
                  title: '系统繁忙，请稍后',
                  duration: 2000
                })
              }


            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
    })


  },


})
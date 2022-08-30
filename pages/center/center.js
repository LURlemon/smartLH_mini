// pages/center/center.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userId: app.globalData.userId,
    orgName: '欢迎使用',
    avatarUrl: '../../image/avatar.png',
    orgStatus: 0,
    wxOrg: {},
    isAudit: 0,
    isNew: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.state)

    this.setData({
      avatarUrl: app.globalData.avatarUrl,
      orgStatus: app.globalData.orgStatus,
      isAudit:  app.globalData.isAudit

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
      orgStatus: app.globalData.orgStatus,
      isAudit:  app.globalData.isAudit
    })

    wx.request({
      url: app.globalData.baseUrl + 'WxOrg/getById',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        id: app.globalData.wxId,
      },

      success(res) {
        console.log(res.data)
        app.globalData.orgId = res.data.data.orgId;
        app.globalData.orgStatus = res.data.data.status
        app.globalData.phone = res.data.data.phone
        that.setData({
          wxOrg: res.data.data,
          orgStatus: res.data.data.status,
          orgName: res.data.data.orgName
        })
        if (res.data.data.orgName == "" || res.data.data.orgName == null) {
          that.setData({
            orgName: '欢迎使用'
          })
        }

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

    if(app.globalData.orgId != 0 && app.globalData.orgId != null && app.globalData.orgId != ''){
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
          if(res.data.code == 6){
            app.globalData.isAudit = res.data.data.audit
            that.setData({
              isAudit: res.data.data.audit
            })
          }
          
        }
      })
    }
  },

  openPage: function (e) {
    var url = e.currentTarget.dataset.url;
    var linkUrl = '/pages/organization/orgLink/orgLink';
    var recordUrl = '/pages/organization/recruitment/record/record';
    var infoUrl = '/pages/organization/andInfo/andInfo'
    var resumeListUrl = '/pages/organization/resumeList/resumeList'
    var that = this;
    console.log(url);
    console.log(app.globalData.orgId)
    
    if (app.globalData.phone == '' || app.globalData.phone == null) {
      wx.showModal({
        title: '温馨提示',
        content: '请先设置您的信息',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../organization/setInfo/accountInfo/accountInfo',
            })
          }
        }
      })
    } else {
      if ((app.globalData.orgId == null || app.globalData.orgId == '' || app.globalData.orgId == 0) && url == recordUrl) {
        wx.showModal({
          title: '温馨提示',
          content: '请先绑定您的单位',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: linkUrl,
              })
            }
          }
        })
      } 
      else if ((app.globalData.orgId == null || app.globalData.orgId == '' || app.globalData.orgId == 0) && url == infoUrl) {
        wx.showModal({
          title: '温馨提示',
          content: '请先绑定您的单位',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: linkUrl,
              })
            }
          }
        })
      } else {
        if (app.globalData.orgStatus == 3 && (url == recordUrl || url == infoUrl)) {
          wx.showToast({
            title: '请等待加入审核',
            duration: 2000,
            image: "/image/tips.png"
          })
        } else {
          wx.navigateTo({
            url: url,
          })
        }

      }
    }
  },

  cancelLink: function (e) {
    var that = this;
    wx.showModal({
      title: '您确定要解除与 “' + app.globalData.orgName + '” 的绑定吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + 'WxOrg/cancelLink',
            method: 'GET',
            header: {
              'content-type': 'application/json', // 默认值
              'X-token': app.globalData.token
            },
            data: {
              wxId: app.globalData.wxId,
              orgName: app.globalData.orgName
            },

            success(res) {
              console.log(res.data)
              if (res.data.code == 6) {
                wx.showToast({
                  title: '解除绑定成功',
                })
                app.globalData.status = 0,
                  app.globalData.orgName = "欢迎使用",
                  app.globalData.orgId = 0,
                  wx.setStorageSync('orgId', "")
                that.setData({
                  orgStatus: 0,
                  orgName: "欢迎使用",
                })
              }

              console.log(wx.getStorageSync('orgId'))
            }
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

  },
})
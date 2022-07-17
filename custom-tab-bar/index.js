const app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#2b9af5",
    UserBars: [
      {
        "pagePath": "/pages/user/userInfo/userInfo",
        "text": "个人信息",
        "iconPath": "/image/write.png",
        "selectedIconPath": "/image/write2.png"
      },
      {
        "pagePath": "/pages/information/information",
        "text": "需求动态",
        "iconPath": "/image/list1.png",
        "selectedIconPath": "/image/list2.png"
      },
      {
        "pagePath": "/pages/center/center",
        "text": "用户中心",
        "iconPath": "/image/center1.png",
        "selectedIconPath": "/image/center2.png"
      }
    ],
    OrgBars: [
      {
        "pagePath": "/pages/organization/recruitment/recruitment",
        "text": "发布需求",
        "iconPath": "/image/write.png",
        "selectedIconPath": "/image/write2.png"
      },
      {
        "pagePath": "/pages/information/information",
        "text": "发布记录",
        "iconPath": "/image/send2.png",
        "selectedIconPath": "/image/send1.png"
      },
      {
        "pagePath": "/pages/center/center",
        "text": "用户中心",
        "iconPath": "/image/center1.png",
        "selectedIconPath": "/image/center2.png"
      }
    ],
    list: [ {
      "pagePath": "/pages/user/userInfo/userInfo",
      "text": "个人信息",
      "iconPath": "/image/write.png",
      "selectedIconPath": "/image/write2.png"
    },
    {
      "pagePath": "/pages/information/information",
      "text": "需求动态",
      "iconPath": "/image/list1.png",
      "selectedIconPath": "/image/list2.png"
    },
    {
      "pagePath": "/pages/center/center",
      "text": "用户中心",
      "iconPath": "/image/center1.png",
      "selectedIconPath": "/image/center2.png"
    }]
  },
  attached() {  
    const state = app.globalData.state
    if (state == 0) {
      this.setData({
        list: this.data.UserBars
      })
    }
    else if (state == 1) {
      this.setData({
        list: this.data.OrgBars
      })
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      if(url == '/pages/center/center' && wx.getStorageSync('state') == 1){
        this.setData({
          list: this.data.OrgBars
        })
      }
      if(url == '/pages/organization/recruitment/recruitment.wxml' && wx.getStorageSync('state') == 1){
        this.setData({
          list: this.data.OrgBars
        })
      }
      if(url == '/pages/information/information' && wx.getStorageSync('state') == 1){
        this.setData({
          list: this.data.OrgBars
        })
      }
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})
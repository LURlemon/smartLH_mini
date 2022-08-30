// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  globalData: {
    userInfo: null,
    avatarUrl: '/image/avatar.png',
    name: "欢迎使用",
    state: Number,  //用户的身份，0为个人、1为单位
    orgStatus: 0, //是否企业管理员 1为管理员，2为普通用户，3为待审核
    orgName: "欢迎使用",
    baseUrl: 'https://localhost:8443/',
    //baseUrl: 'http://49.51.244.95:8081/',
    //baseUrl: 'https://www.lhxwzzb.cn:8443/',
    //baseUrl: 'https://8.134.53.211:8443/',
    //baseUrl: 'https://zhuzhibu.xiangyan.shop:8443/',
    isAudit: Number,
    isSubmit: Number,

    phone: '',
    password: '123456',
    // token: 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MiwidHlwZSI6MiwiZXhwIjoxNjU3OTgwNjY2fQ.RPRNQmFKbHpTM1qYADV0tBDUpbKSvhRWMF_ODQIC9yyeVS5erza-DzooH03McmFwRNtvuQMnqOxCUFwyVd89DQ',


    userId:  wx.getStorageSync('userId'),//用于请求后端的人才id
    wxId:  wx.getStorageSync('wxId'),//用于请求后端的单位用户id
    orgId:  wx.getStorageSync('orgId'),
    token: wx.getStorageSync('token')
  
  },
})

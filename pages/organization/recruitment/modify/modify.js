// pages/organization/recruitment/modify/modify.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    academics: ['不限', '高中', '大专', '本科', '硕士', '博士'],
    academicIndex: 0,

    politics: ["不限", "中共党员", "中共预备党员", "共青团员", "群众", "民革党员", "民盟盟员", "民建会员", "民进会员", "农工党党员", "致公党党", "九三学社社员", "台盟盟员", "无党派人士"],
    politicIndex: 0,

    experience: ['工作经验不限', '1年以上', '2年以上', '3年以上', '5年以上', '8年以上', '10年以上'],
    experienceIndex: 0,

    endTime: '请选择',

    content: "",
    contentWord: 0,
    remark: "",
    remarkWord: 0,
    
    salaryFloor: 0,
    salaryCell: 0,

    recruitment: {
      orgName: null, //单位名称 全局变量
      position: null, //职位
      number: null, //人数
      subject: null, //专业
      fresh: null, //是否要求应届生
      age: null, //最高年龄需求
      education: "本科", //最低学历要求
      place: null, //工作地
      politics: "中共党员", //政治面貌
      endTime: null, //截止日期
      salaryFloor: null, //薪资上限
      salaryCell: null, //薪资下限
      content: null,
      title: null,
      view: 0, //访问量
      remark: null, //备注
      experience: null, //工作经验
      wxOrgId: app.globalData.wxId,
      orgId: app.globalData.orgId
    },

    formData: {},
    rules: [{
      name: 'title',
      rules: { required: true, message: '请输入标题' },
    }, {
      name: 'position',
      rules: { required: true, message: '请输入岗位名称' },
    }, {
      name: 'content',
      rules: { required: true, message: '请输入岗位职责' },
    },{
      name: 'number',
      rules: { required: true, message: '请输入人数要求' },
    }, {
      name: 'subject',
      rules: { required: true, message: '请输入专业' },
    }, {
      name: 'fresh',
      rules: { required: true, message: '请输入招聘对象' },
    },{
      name: 'age',
      rules: { required: true, message: '请输入年龄要求' },
    }, {
      name: 'place',
      rules: { required: true, message: '请输入工作地点' },
    }, {
      name: 'date',
      rules: { required: true, message: '请选择截止日期' },
    }, {
      name: 'salaryFloor',
      rules: { required: true, message: '请输入工资上限' },
    }, {
      name: 'salaryCell',
      rules: { required: true, message: '请输入工资下限' },
    }, {
      name: 'remark',
      rules: { required: true, message: '请填写岗位要求' },
    }]

  },


  /**
  * 生命周期函数--监听页面加载
  */
  onLoad(options) {
    var that = this;
    console.log(options);
    wx.request({
      url: app.globalData.baseUrl + 'Recruitment/getRecById',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'X-token': app.globalData.token
      },
      data: {
        recruitmentId: options.recId
      },
      success(res) {
        console.log(res.data)
        if (res.data.data.content != null && res.data.data.content != '')
          var contentLength = parseInt(res.data.data.content.length); //解析字符串长度转换成整数。

        if (res.data.data.remark != null && res.data.data.remark != '')
          var remarkLength = parseInt(res.data.data.remark.length); //解析字符串长度转换成整数。

        that.setData({
          recruitment: res.data.data,
          formData: res.data.data,
          ['formData.date']: res.data.data.endTime,
          remarkWord: remarkLength,
          contentWord: contentLength
        })
      }
    })

  },



  // bindFreshChange: function (e) {
  // 	console.log(e.detail)
  // 	if (e.detail.value) {
  // 		this.setData({
  // 			isFresh: 1,
  // 			['recruitment.fresh']: 1
  // 		})
  // 	} else {
  // 		this.setData({
  // 			isFresh: 0,
  // 			['recruitment.fresh']: 0
  // 		})
  // 	}
  // },


  bindEducationChange: function (e) {
    console.log(e.detail.value)
    var academics = this.data.academics;
    console.log(academics)
    this.setData({
      academicIndex: e.detail.value,
      ['recruitment.education']: academics[e.detail.value]
    })
    console.log(this.data.recruitment.education)
  },

  bindPoliticChange: function (e) {
    console.log(e.detail.value)
    var politics = this.data.politics;
    console.log(politics)
    this.setData({
      politicIndex: e.detail.value,
      ['recruitment.politics']: politics[e.detail.value]
    })
    console.log(this.data.recruitment.politics)
  },

  bindEndTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      ['recruitment.endTime']: e.detail.value,
      ['formData.date']: e.detail.value,
      endTime: e.detail.value
    })
  },

  bindContent: function (e) {
    var that = this;
    var value = e.detail.value;

    var wordLength = parseInt(value.length); //解析字符串长度转换成整数。
    if (200 < wordLength) {
      return;
    }
    that.setData({
      currentWord: wordLength,
      ['recruitment.content']: value,
      ['formData.content']: value
    });
    console.log(this.data.recruitment.content)
  },

  bindExperienceChange: function (e) {
    console.log(e.detail.value)
    var experience = this.data.experience;
    console.log(experience)
    this.setData({
      experienceIndex: e.detail.value,
      ['recruitment.experience']: experience[e.detail.value]
    })
    console.log(this.data.recruitment.experience)
  },

  bindRemark: function (e) {
    var that = this;
    var value = e.detail.value;

    var wordLength = parseInt(value.length); //解析字符串长度转换成整数。
    if (200 < wordLength) {
      return;
    }
    that.setData({
      remarkWord: wordLength,
      ['recruitment.remark']: value,
      ['formData.remark']: value
    });
    console.log(this.data.recruitment.remark)
  },

  formInputChange: function (e) {
    console.log(e.detail);
    var type = e.currentTarget.dataset.field;
    var content = e.detail.value;
    console.log("输入类别：" + type)
    var that = this;
    switch (type) {
      case "title":
        that.setData({
          ['recruitment.title']: content,
          ['formData.title']: content
        })
        break;
      case "position":
        that.setData({
          ['recruitment.position']: content,
          ['formData.position']: content
        })
        break;
      case "number":
        that.setData({
          ['recruitment.number']: content,
          ['formData.number']: content
        })
        break;
      case "subject":
        that.setData({
          ['recruitment.subject']: content,
          ['formData.subject']: content
        })
        break;
      case "age":
        that.setData({
          ['recruitment.age']: content,
          ['formData.age']: content
        })
        break;
      case "place":
        that.setData({
          ['recruitment.place']: content,
          ['formData.place']: content
        })
        break;
      case "fresh":
        that.setData({
          ['recruitment.fresh']: content,
          ['formData.fresh']: content
        })
        break;
    }
    console.log(this.data.recruitment, Object)
  },


  bindSalary:function(e){
    
    var type = e.currentTarget.dataset.field;
    var content = e.detail.value;
    console.log("输入类别：" + type)
    var that = this;
    console.log(content)
    
    switch(type){
      case "salaryCell":
        console.log(that.data.salaryFloor)
        if(content - that.data.salaryFloor > 0){
          that.setData({
            ['recruitment.salaryCell']: content,
            ['formData.salaryCell']: content,
            salaryCell: content
          })
        }else{
          wx.showToast({
            title: '注意薪资范围',
            image: '/image/tips.png'
          })
        }

        break;
      case "salaryFloor":
        console.log(that.data.salaryCell)
        if(content - that.data.salaryCell < 0){
          that.setData({
            ['recruitment.salaryFloor']: content,
            ['formData.salaryFloor']: content,
            salaryFloor: content
          })
        }else{
          wx.showToast({
            title: '注意薪资范围',
            image: '/image/tips.png'
          })
        }
        break;
    }
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
          title: '校验通过',
        })
        this.setData({
          ['recruitment.orgName']: app.globalData.orgName
        })
        var recruitment = this.data.recruitment;
        if (recruitment.endTime == "请选择") {
          recruitment.endTime = '';
        }
        console.log(recruitment, Object);
    
        wx.request({
          url: app.globalData.baseUrl + 'Recruitment/setRecruitInfo',
          method: 'POST',
          header: {
            'content-type': 'application/json', // 默认值
            'X-token': app.globalData.token
          },
          data: recruitment,
          success(res) {
            console.log(res.data);
            if (res.data.code == 6) {
              wx.showToast({
                title: '修改成功',
                duration: 2000,
              })
            }
          }
        })
        setTimeout(function () {
          
          let pages = getCurrentPages();   //获取小程序页面栈
          let beforePage = pages[pages.length - 2];  //获取上个页面的实例对象
          console.log(beforePage)
          wx.navigateBack({
            delta: 1
          })
    
        }, 2000)
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
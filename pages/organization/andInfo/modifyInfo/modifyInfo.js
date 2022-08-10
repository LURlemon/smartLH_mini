// pages/organization/andInfo/modifyInfo/modifyInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    eduList: [],
    isShow: false, //教育经历表单是否显示
    eduId: 0,

    imgs: [],
    imgUrl: '',
    isUpload: 1,

    sex: [{
      id: 1,
      value: '女'
    }, {
      id: 2,
      value: '男'
    }],

    marriage: [{
      id: 1,
      value: '未婚'
    }, {
      id: 2,
      value: '已婚'
    }],

    academics: ['请选择', '初中', '高中', '大专', '本科', '硕士', '博士'],
    academicIndex: 0,
    academic: null,

    politics: ['请选择', "中共党员", "中共预备党员", "共青团员", "群众", "民革党员", "民盟盟员", "民建会员", "民进会员", "农工党党员", "致公党党", "九三学社社员", "台盟盟员", "无党派人士"],
    politicIndex: 0,
    politic: null,

    isFresh: 0,

    currentWord: 0,
    introduce: "",

    user: {},
    formData: {},

    rules: [{
      name: 'username',
      rules: {
        required: true,
        message: '请输入姓名'
      },
    }, {
      name: 'phone',
      rules: [{
        required: true,
        message: '手机号必填'
      }, {
        mobile: true,
        message: '手机号码格式不对'
      }],
    }, {
      name: 'sex',
      rules: {
        required: true,
        message: '请选择性别'
      },
    }, {
      name: 'date',
      rules: {
        required: true,
        message: '请选择出生日期'
      },
    }, {
      name: 'home',
      rules: {
        required: true,
        message: '请输入籍贯'
      },
    }, {
      name: 'place',
      rules: {
        required: true,
        message: '请输入现居地'
      },
    }, {
      name: 'academic',
      rules: {
        required: true,
        message: '请选择学历'
      },
    }, {
      name: 'politics',
      rules: {
        required: true,
        message: '请选择政治面貌'
      },
    }, {
      name: 'idcard',
      rules: {
        validator(rule, value) {
          if (!value || value.length !== 18) {
            return 'idcard格式不正确'
          }
          return ''
        }
      },
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    var user = JSON.parse(options.user)
    console.log(user)
    this.setData({
      user: user,
      formData: user,
      ['formData.username']: user.name,
      ['formData.date']: user.birthday,
    })

    var that = this
    if (user.introduction != '' && user.introduction != null) {
      that.setData({
        currentWord: parseInt(user.introduction.length)
      })
    }

    if (user.education != null && user.education != "") {
      if (JSON.parse(user.education).length > 0) {
        that.setData({
          eduList: JSON.parse(user.education),
          isShow: true
        })
      }
    }

    if (user.sex == '女') {
      that.setData({
        ['sex[0].checked']: true
      })
    }
    if (user.sex == '男') {
      that.setData({
        ['sex[1].checked']: true
      })
    }

    if (user.marriage == "未婚") {
      that.setData({
        ['marriage[0].checked']: true
      })
    }
    if (user.marriage == "已婚") {
      that.setData({
        ['marriage[1].checked']: true
      })
    }

    if (user.fresh == 1) {
      that.setData({
        isFresh: true
      })
    } else {
      that.setData({
        isFresh: false
      })
    }

    if (user.birthday == '' || user.birthday == null) {
      console.log(user.birthday)
      that.setData({
        ['user.birthday']: "请选择"
      })
    }

    if (user.graduation == '' || user.graduation == null) {
      that.setData({
        ['user.graduation']: "请选择"
      })
    }

    for (let i = 0; i < that.data.politics.length; i++) {
      if (user.politics == that.data.politics[i]) {
        console.log(user.politics)
        that.setData({
          politicIndex: i
        })
        break;
      }
    }



    for (let i = 0; i < that.data.academics.length; i++) {
      if (user.academic == that.data.academics[i]) {
        console.log(user.academic)
        that.setData({
          academicIndex: i
        })
        break;
      }
    }

  },

  // sexinp
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const sex = this.data.sex
    var userSex = '女';
    for (let i = 0, len = sex.length; i < len; ++i) {
      sex[i].checked = sex[i].id == e.detail.value
      if (sex[i].checked) {
        userSex = sex[i].value;
      }
    }
    this.setData({
      sex,
      ['user.sex']: userSex,
      ['formData.sex']: userSex
    })
    console.log(this.data.sex);
    console.log(e.detail.value)
    console.log(this.data.user.sex);
    console.log(userSex)
  },

  bindBirthdayChange: function (e) {
    console.log(e.detail)
    this.setData({
      ['user.birthday']: e.detail.value,
      ['formData.date']: e.detail.value
    })
    console.log(this.data.user.birthday)
  },

  bindAcademicChange: function (e) {
    console.log(e.detail.value)
    var academics = this.data.academics;
    console.log(academics)
    if (academics[e.detail.value] == '请选择') {
      this.setData({
        academicIndex: e.detail.value,
        ['user.academic']: null,
        ['formData.academic']: null,
      })
      return;
    }

    this.setData({
      academicIndex: e.detail.value,
      ['user.academic']: academics[e.detail.value],
      ['formData.academic']: e.detail.value,
      academic: academics[e.detail.value]
    })
    console.log(academics[e.detail.value])
    console.log(this.data.user.academic)
    console.log(this.data.academic)
  },


  // 新增表单
  additem(e) {
    //查看教育信息是否存储
    var length = this.data.eduList.length;
    if (length >= 1) {
      console.log("edus:" + this.data.eduList[length - 1].schoolName + this.data.eduList[length - 1].inDate + this.data.eduList[length - 1].outDate);
    }

    let forms = this.data.eduList;
    var newItem = {
      inDate: "请选择",
      outDate: "请选择",
      schoolName: null
    };
    let edus = forms.concat(newItem);
    this.setData({
      eduList: edus,
      isShow: true
    })
  },

  bindInDateChange(e) {
    var id = e.currentTarget.dataset.id;
    var edus = this.data.eduList;
    edus[id].inDate = e.detail.value;

    this.setData({
      eduList: edus
    })
  },

  bindOutDateChange(e) {
    var id = e.currentTarget.dataset.id;
    var edus = this.data.eduList;
    edus[id].outDate = e.detail.value;
    this.setData({
      eduList: edus
    })
  },
  // 输入框取值
  schoolInput(e) {
    var id = e.currentTarget.dataset.id;
    var edus = this.data.eduList;
    edus[id].schoolName = e.detail.value;

    //最新的数组
    this.setData({
      eduList: edus
    })
  },

  deleteEdu: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id;
    console.log(index)
    var edus = this.data.eduList;
    console.log(edus);
    edus.splice(index, 1);
    console.log(edus);
    this.setData({
      eduList: edus
    });
  },
  // sexinp
  marriageChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const marriages = this.data.marriage
    var marriage = '未婚';
    for (let i = 0, len = marriages.length; i < len; ++i) {
      marriages[i].checked = marriages[i].id == e.detail.value
      if (marriages[i].checked) {
        marriage = marriages[i].value;
      }
    }
    console.log(marriage)
    this.setData({
      ['user.marriage']: marriage,
      ['formData.marriage']: marriage

    })
    console.log(this.data.marriage);
  },

  bindPoliticChange: function (e) {
    console.log(e.detail.value)
    var politics = this.data.politics;
    console.log(politics[e.detail.value])
    if (politics[e.detail.value] == '请选择') {
      this.setData({
        politicIndex: e.detail.value,
        ['user.politics']: null,
        ['formData.politics']: null,
      })
      return;
    }
    this.setData({
      politicIndex: e.detail.value,
      ['user.politics']: politics[e.detail.value],
      ['formData.politics']: e.detail.value,
      politic: politics[e.detail.value]
    })
    console.log(this.data.user.politics)
    console.log(this.data.politic)
  },

  bindFreshChange: function (e) {
    console.log(e.detail)
    var mydate = new Date();
    var date = mydate.getFullYear() + "-07-01";
    console.log(date)
    if (e.detail.value) {
      this.setData({
        isFresh: true,
        ['user.fresh']: 1,
        ['user.graduation']: date
      })
    } else {
      this.setData({
        isFresh: false,
        ['user.fresh']: 0,
        ['user.graduation']: "请选择"
      })
    }
  },

  bindGraduationChange: function (e) {
    console.log(e.detail)
    this.setData({
      ['user.graduation']: e.detail.value
    })
  },

  bindIntroduce: function (e) {
    var that = this;
    var value = e.detail.value;

    var wordLength = parseInt(value.length); //解析字符串长度转换成整数。
    if (200 < wordLength) {
      return;
    }
    that.setData({
      currentWord: wordLength,
      ['user.introduction']: value
    });
    console.log(this.data.user.introduction)
  },


  chooseImg: function (e) {
    var that = this;
    wx.chooseMedia({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res, Object)

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePath = res.tempFiles[0].tempFilePath;
        console.log(tempFilePath + '----');
        var img = tempFilePath;
        console.log(img);
        var imgs = that.data.imgs;
        imgs.push(img);
        that.setData({
          imgs: imgs,
          isUpload: 0
        });
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs,
      isUpload: 1
    });
  },
  // 预览图片
  previewImg: function (e) {
    console.log(this.data.imgs)
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  upload: function () {
    var that = this;
    wx.uploadFile({
      filePath: this.data.imgs[0],
      name: 'file',
      url: app.globalData.baseUrl + 'upload/image',

      success(res) {
        console.log(res, Object);
        //返回结果为json格式字符串
        var result = JSON.parse(res.data);
        console.log(result);
        if (result.code == 6) {
          wx.showToast({
            title: '上传成功',
          })
          that.setData({
            imgUrl: result.data,
            ['user.photo']: result.data
          });
        } else {
          wx.showToast({
            title: '上传失败',
          })
          that.setData({
            imgUrl: '',
            imgs: [],
            isUpload: 1
          })
        }

      },
      fail(res) {
        console.log(res, Object)
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
          ['user.name']: content,
          ['formData.username']: content
        })
        break;
      case "phone":
        that.setData({
          ['user.phone']: content,
          ['formData.phone']: content
        })
        break;
      case "wxAccount":
        that.setData({
          ['user.wxAccount']: content
        })
        break;
      case "home":
        that.setData({
          ['user.home']: content,
          ['formData.home']: content
        })
        break;
      case "place":
        that.setData({
          ['user.place']: content,
          ['formData.place']: content
        })
        break;
      case "subject":
        that.setData({
          ['user.subject']: content
        })
        break;
      case "nation":
        that.setData({
          ['user.nation']: content
        })
        break;
      case "mailbox":
        that.setData({
          ['user.mailbox']: content,
          ['formData.mailbox']: content
        })
        break;
      case "work":
        that.setData({
          ['user.work']: content
        })
        break;
      case "post":
        that.setData({
          ['user.post']: content
        })
        break;
      case "prize":
        that.setData({
          ['user.prize']: content
        })
        break;
    }
    console.log(that.data.user, Object)
  },

  submit: function () {
    console.log(this.data.formData)
    console.log(this.data.user)
    var id = this.data.user.id;
    var that = this;
    var edusStr = JSON.stringify(this.data.eduList);
    this.setData({
      ['user.education']: edusStr,
      ['user.id']: app.globalData.userId
    })
    var user = this.data.user;
    user.academic = this.data.academic
    user.politics = this.data.politic
    user.status = 1
    user.orgId = app.globalData.orgId
    user.orgName = app.globalData.orgName
    user.id = id


    if (user.birthday == "请选择") {
      user.birthday = '';
    }
    if (user.graduation == "请选择") {
      user.graduation = '';
    }
    if (user.academic == "请选择") {
      user.academic = '';
    }
    console.log(user, Object);


    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        wx.showToast({
          title: '校验通过'
        })

        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: 0
          })
        }



        wx.request({
          url: app.globalData.baseUrl + 'WxOrg/setUserInfo',
          method: 'POST',
          header: {
            'content-type': 'application/json', // 默认值
            'X-token': app.globalData.token
          },
          data: user,
          success(res) {
            console.log(res.data);
            wx.showToast({
              title: '添加成功',
              content: res.data.message,
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack()
            }, 2000)
          },
          error(res) {
            console.log(res.data)
            wx.showToast({
              title: '添加失败',
              duration: 2000
            })
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
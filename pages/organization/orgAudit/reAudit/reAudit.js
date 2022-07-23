// pages/organization/orgAudit/reAudit/reAudit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    imgs: [],
    imgUrl: '',
    isUpload: 1,

    types: [],
    typeIndex: 0,
    type: '请选择',

    introduction: "",
    currentWord: 0,

    organization: {
      type: '', //单位类型
      name: '', //单位名称
      address: '',
      phone: '',
      material: '', //审核材料，eg：图片
      serialNumber: '', //该单位编号，如企业工商管理号
      introduction: '',
    },

    formData: {},
    rules: [{
      name: 'address',
      rules: {
        required: true,
        message: '请输入单位地址'
      },
    }, {
      name: 'type',
      rules: {
        required: true,
        message: '请选择单位类型'
      },
    }, {
      rules: {
        required: true,
        message: '手机号必填'
      }
    }, {
      name: 'serialNumber',
      rules: {
        required: true,
        message: '请输入统一社会信用代码'
      },
    }, {
      name: 'introduction',
      rules: {
        required: true,
        message: '请输入单位介绍'
      },
    }, {
      name: 'material',
      rules: {
        required: true,
        message: '请上传证明材料'
      },
    }]


  },


  bindTypeChange: function (e) {
    console.log(e.detail.value)
    var types = this.data.types;
    console.log(types)
    this.setData({
      typeIndex: e.detail.value,
      type: types[e.detail.value],
      ['organization.type']: types[e.detail.value],
      ['formData.type']: types[e.detail.value]
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
      success(res) {
        console.log(res);
        that.setData({
          organization: res.data.data,
          formData: res.data.data,
          ['formData.orgname']: res.data.data.name
        })
        if(res.data.data.introduction != '' && res.data.data.introduction 
        != null){
          that.setData({
            currentWord: parseInt(res.data.data.introduction.length)
          })
        }
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


  bindContent: function (e) {
    var that = this;
    var value = e.detail.value;

    var wordLength = parseInt(value.length); //解析字符串长度转换成整数。
    if (200 < wordLength) {
      return;
    }
    that.setData({
      currentWord: wordLength,
      ['organization.introduction']: value,
      ['formData.introduction']: value
    });
    console.log(this.data.organization.content)
  },

  chooseImg: function (e) {
    var that = this;
    wx.chooseMedia({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
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

        if (result.code != 6) {
          wx.showToast({
            title: '上传失败',
          })
          that.setData({
            imgUrl: '',
            imgs: [],
            isUpload: 1
          })
        }else{
          wx.showToast({
            title: '上传成功',
          })
        }
        that.setData({
          imgUrl: result.data,
          ['organization.material']: result.data,
          ['formData.material']: result.data
        });
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
          ['organization.name']: content,
          ['formData.orgname']: content
        })
        break;
      case "phone":
        that.setData({
          ['organization.phone']: content,
          ['formData.phone']: content
        })
        break;
      case "address":
        that.setData({
          ['organization.address']: content,
          ['formData.address']: content
        })
        break;
      case "serialNumber":
        that.setData({
          ['organization.serialNumber']: content,
          ['formData.serialNumber']: content
        })
        break;
    }
    console.log(this.data.organization, Object)
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
      } else {
        wx.showToast({
          title: '校验通过',
        })
        var organization = that.data.organization;
        organization.audit = 0;
        console.log(organization, Object);
        wx.request({
          url: app.globalData.baseUrl + 'Organization/setOrgInfo',
          method: 'POST',
          header: {
            'content-type': 'application/json', // 默认值
            'X-token': app.globalData.token
          },
          data: organization,
          success(res) {
            console.log(res.data);
            var code = res.data.code;
            if (code == 7) {
              wx.showToast({
                title: '提交失败',
                duration: 2000
              })
            }
            if (code == 6) {
              wx.showToast({
                title: '已提交审核',
              })
              wx.switchTab({
                url: '../../center/center',
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
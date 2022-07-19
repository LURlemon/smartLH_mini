// 引入数据
const tabTxtArr = require('../../utils/filtrate.js');
import request from '../../utils/request'
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabTxt: [],
    searchParam: [],
    positionList: [],
    nowPositionList: [],
    selected: ["", "", ""],
    state: 1, //用户身份 
    page: 0,
    isTriggered: false,
    index: 0,
    bool: false,
    noMore: false,
    isLoading: true,
    isNew: true,
    isJoin: false,
  },
  salary(list, floor, cell) {
    let i = 0,
      length = list.length
    for (; i < length; i++) {
      if (list[i].salaryFloor < floor || list[i].salaryCell > cell) {
        list.splice(i, 1)
        i--
        length--
      }
    }
  },

  //详情
  detail(e) {
    let num = e.currentTarget.dataset.index
    let id = this.data.nowPositionList[num].id
    wx.navigateTo({
      url: '/pages/information/detail/detail?id=' + id,
    })
  },


  //个人切换导航按钮
  filterTab(e) {
    var that = this;
    var data = JSON.parse(JSON.stringify(that.data.tabTxt));
    var index = e.currentTarget.dataset.index;
    if (index == 0 && this.data.tabTxt[1].active == false) {
      return
    } else if (index == 1 && this.data.tabTxt[1].active == true) {
      var newTabTxt = data.map(function (e) {
        e.active = !e.active;
        return e;
      });
    } else {
      var newTabTxt = data.map(function (e) {
        e.active = false;
        return e;
      });
      newTabTxt[index].active = !that.data.tabTxt[index].active;
    }

    console.log("newtabtxt");
    console.log(newTabTxt);

    this.setData({
      tabTxt: newTabTxt
    })
    // if (e.text == '最新') {

    //   this.getPosition(0);
    // }
  },
  // 点击导航按钮的条件
  clickTabChild(e) {
    let tabTxt = this.data.tabTxt;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let index3 = e.currentTarget.dataset.index3;
    //1.在改变某个子按钮之前先把该子按钮组的所有选中状态selected改成false，
    tabTxt[index1].child[index2].childType.forEach(e => {
      if (e.id != index3 + 1 || !e.selected)
        e.selected = false
    })
    //2.之后再把当前点击的按钮的状态改为true
    tabTxt[index1].child[index2].childType[index3].selected = !tabTxt[index1].child[index2].childType[index3].selected;
    this.setData({
      tabTxt: tabTxt
    })
  },
  // 清空条件
  filterClears(e) {
    var that = this;
    wx.showModal({
      title: '确定要清空当前所选条件吗？',
      success(res) {
        if (res.confirm) {
          let tabTxt = that.data.tabTxt;
          tabTxt.forEach(e1 => {
            e1.child.forEach(e2 => {
              if (Object.keys(e2).length == 0) return
              e2.childType.forEach(e3 => {
                if (e1.active) {
                  e3.selected = false
                }
              })
            })
          })
          that.setData({
              tabTxt: tabTxt,
            }),
            that.filterSubmit();
        }
      }

    })
  },
  // 确定按钮
  async filterSubmit(e) {
    var that = this;
    let tabTxt = this.data.tabTxt;
    let selectedTextArr = [];
    let positionListData = [].concat(this.data.positionList)
    tabTxt.forEach(e1 => {
      console.log(e1)
      e1.active = false; //关闭抽屉
      e1.child.forEach(e2 => {
        if (Object.keys(e2).length == 0) return
        if (e2.title == "薪资") {
          console.log(e2)
          e2.childType.forEach(e3 => {
            if (e3.selected) {
              switch (e3.id) {
                case 1:
                  this.salary(positionListData, 1000, 2000)
                  break
                case 2:
                  this.salary(positionListData, 2000, 3000)
                  break
                case 3:
                  this.salary(positionListData, 3000, 4000)
                  break
                case 4:
                  this.salary(positionListData, 4000, 6000)
                  break
                case 5:
                  this.salary(positionListData, 6000, 8000)
                  break
                case 6:
                  this.salary(positionListData, 8000, 10000)
                  break
                case 7:
                  this.salary(positionListData, 10000, 9999999)
                  break
                default:
              }
            }
          })
        }
        if (e2.title == "工作经验") {
          e2.childType.forEach(e3 => {
            if (e3.selected) {
              let i = 0,
                length = positionListData.length;
              for (; i < length; i++) {
                if (positionListData[i].experience != e3.text) {
                  positionListData.splice(i, 1);
                  i--;
                  length--;
                }
              }
            }
          })
        }
        if (e2.title == "学历") {
          e2.childType.forEach(e3 => {
            if (e3.selected) {
              let i = 0,
                length = positionListData.length;
              for (; i < length; i++) {
                if (positionListData[i].education != e3.text) {
                  positionListData.splice(i, 1);
                  i--;
                  length--;
                }
              }
            }
          })
        }
        if (e2.title == "年龄") {
          e2.childType.forEach(e3 => {
            if (e3.selected) {
              let i = 0,
                length = positionListData.length;
              for (; i < length; i++) {
                if (positionListData[i].age != e3.text) {
                  positionListData.splice(i, 1);
                  i--;
                  length--;
                }
              }
            }
          })
        }
        let bool = false;
        e2.childType.forEach(e3 => {
          if (e3.selected) {
            //选中的加载在一个数组中
            bool = true;
            selectedTextArr.push(e3.text)
          }
        })
        if (!bool) {
          selectedTextArr.push("")
        }
      })
    })
    if (positionListData.length < 6) {
      if (this.data.page < this.data.positionList.length) {
        this.getPosition(this.data.page + 1)
        return
      }
    }
    tabTxt[0].active = true;
    this.setData({
      tabTxt: tabTxt,
      selected: selectedTextArr,
      nowPositionList: positionListData,
      bool: true,
    })

    console.log(this.data.nowPositionList)

  },
  //个人用户得到招聘信息
  async getPosition(num) {
    this.setData({
      isLoading: false,
    })
    let positionListData = await request('/Recruitment/getAll', {
      pageNum: num / 6 + 1,
      number: 6
    })

    console.log(positionListData.data)
    if (positionListData.data == null) {
      this.setData({
        page: num + 5,
        noMore: true,
        isLoading: true,
      })
      this.filterSubmit();
      return
    }
    if (positionListData.data.list.length < 6) {
      this.setData({
        noMore: true,
        isLoading: true,
      })
    }

    let positionList = this.data.positionList
    positionList.push(...positionListData.data.list)
    let nowPositionList = this.data.nowPositionList
    nowPositionList.push(...positionListData.data.list)
    this.setData({
      positionList,
      nowPositionList,
      isTriggered: false,
      page: num + 5,
      isLoading: true,
    })
    this.filterSubmit();
  },

  //企业用户切换导航按钮
  change(e) {
    var that = this;
    var data = JSON.parse(JSON.stringify(that.data.tabTxt));
    var index = e.currentTarget.dataset.index;
    console.log(index)
    this.setData({
      index: index
    })
    this.showMyPosition(index)
    var newTabTxt = data.map(function (e) {
      e.active = false;
      return e;
    });
    newTabTxt[index].active = true;
    this.setData({
      tabTxt: data
    })
  },
  //企业用户得到招聘信息
  async showMyPosition(index) {
    let positionListData = await request('/Recruitment/getRecsByState', {
      orgId: app.globalData.orgId,
      state: index
    }, {
      'content-type': 'application/json', // 默认值
      'X-token': app.globalData.token
    })

    this.setData({
      positionList: positionListData.data,
      nowPositionList: positionListData.data,
      isTriggered: false,
      bool: true,
      noMore: true,
    })
    console.log(this.data.nowPositionList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.state == 0) {
      let that = this;
      that.setData({
        tabTxt: tabTxtArr.tabTxt,
        state: app.globalData.state
      })
      this.getPosition(0)
    } else {
      let that = this;
      if (app.globalData.orgStatus == 1 || app.globalData.orgStatus == 2) {
        that.setData({
          isJoin: true
        })
      } else {
        that.setData({
          isJoin: false
        })
      }
      that.setData({
        state: app.globalData.state == 1,
        tabTxt: [{
          text: "全部",
          active: true
        }, {
          text: "进行中",
          active: false
        }, {
          text: "已结束",
          active: false
        }]
      })
      this.showMyPosition(0)
    }
  },
  //开启下拉刷新
  handleRefresh() {
    if (this.data.state == 0) {
      wx.showLoading({
        title: '加载中…'
      })
      this.setData({
        positionList: [],
        nowPositionList: [],
        noMore: false,
        bool: false,
      })
      console.log("下拉1");
      this.getPosition(0)
      let a = setInterval(() => {
        if (this.data.bool) {
          wx.hideLoading()
          clearInterval(a);
        }
      }, 200)
      console.log("刷新成功");
    } else {
      this.setData({
        positionList: [],
        nowPositionList: [],
        noMore: false,
      })
      console.log("下拉2");
      this.showMyPosition(this.data.index);
      console.log("刷新成功");
    }
  },
  //上拉加载
  handleToLower() {
    if (this.data.state == 0) {
      if (!this.data.bool) return
      if (this.data.page < this.data.positionList.length)
        this.getPosition(this.data.page + 1)
      console.log('上拉1')
      console.log(this.data.page + 1)
    } else {
      console.log('上拉2')
    }
  },
  onReachBottom: function () {

  },
  onPullDownRefresh: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.getTabBar(), Object)
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    var that = this

    if (app.globalData.state == 1) {
      if (app.globalData.orgStatus == 1 || app.globalData.orgStatus == 2) {
        that.setData({
          isJoin: true
        })
      } else {
        that.setData({
          isJoin: false
        })
      }
      if (app.globalData.phone == '' || app.globalData.phone == null) {
        wx.showModal({
          title: '温馨提示',
          content: '请先设置您的信息',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/organization/setInfo/accountInfo/accountInfo',
              })
            }
          }
        })
      } else if (app.globalData.orgId == '' || app.globalData.orgId == null || app.globalData.orgId == 0 || app.globalData.orgStatus == 4) {
        wx.showModal({
          title: '温馨提示',
          content: '请先绑定您的单位',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/organization/orgLink/orgLink',
              })
            }
          }
        })
      } else if (app.globalData.orgStatus == 3) {
        wx.showToast({
          title: '请等待加入审核',
          duration: 2000,
          image: "/image/tips.png"
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/center/center',
          })
        }, 2000)
      }else{
        that.showMyPosition(that.data.index)
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
})
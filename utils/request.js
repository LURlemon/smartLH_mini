export default (url, data = {}, header) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://zhuzhibu.xiangyan.shop:8443' + url,
      data,
      method: 'GET',
      header,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export default (url, data = {}, header) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://49.51.244.95:8081' + url,
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
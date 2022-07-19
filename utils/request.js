export default (url, data = {}, header) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://8.134.53.211' + url,
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
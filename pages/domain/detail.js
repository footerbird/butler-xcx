// pages/domain/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_loading: true,
    domain: {
      domain_name: '',
      created_date: '',
      expired_date: '',
      domain_type: '',
      domain_price: 0,
      domain_summary: '',
      is_onsale: 'sale',
      expired_distance: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.load_domainDetail(options.domain_name);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  load_domainDetail(domain_name) {
    const that = this;
    wx.request({
      url: 'https://m.waitui.com/api/get_domainDetail',
      data: {
        domain_name_str: domain_name
      },
      success ({ data }) {
        that.setData({
          domain: data.domain,
          page_loading: false
        });
      }
    })
  }
  
})
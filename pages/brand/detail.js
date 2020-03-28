// pages/brand/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_loading: true,
    brand: {
      brand_name: '',
      brand_lead: '',
      poster_path: '',
      brand_content: '',
      brand_company: '',
      brand_legal: '',
      brand_phone: '',
      brand_origin: '',
      brand_start: '',
    },
    company: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.load_brandDetail(options.brand_id);
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
  
  load_brandDetail: function (brand_id) {
    const that = this;
    wx.request({
      url: 'https://m.waitui.com/api/get_brandDetail',
      data: {
        brand_id: brand_id
      },
      success ({ data }) {
        that.setData({
          brand: data.brand,
          company: data.company,
          page_loading: false
        });
      }
    })
  }
  
})
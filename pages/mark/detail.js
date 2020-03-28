// pages/mark/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_loading: true,
    mark: {
      mark_regno: '',
      mark_category: '',
      mark_name: '',
      image_path: '',
      mark_group: '',
      app_range: '',
      mark_flow: [],
      announce_issue: '',
      announce_date: '',
      reg_issue: '',
      reg_date: '',
      private_limit: '',
      mark_price: 0,
      is_onsale: 'sale',
      category_name: '',
      reg_year: '',
      regno_encode: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.load_markDetail(options.regno_md);
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
  
  load_markDetail: function (regno_md) {
    const that = this;
    wx.request({
      url: 'https://m.waitui.com/api/get_markDetail',
      data: {
        regno_md: regno_md
      },
      success ({ data }) {
        that.setData({
          mark: data.mark,
          page_loading: false
        });
      }
    })
  }
  
})
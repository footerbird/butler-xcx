// pages/brand/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand_list: [],
    brand_page: 1, // 10条一页，每次加载10条
    brand_loading: false,
    brand_finished: false,
    brand_refreshing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.load_brandAjax();
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
    const that = this;
    that.setData({
      brand_page: 1,
      brand_loading: false,
      brand_finished: false,
      brand_refreshing: true
    });
    that.load_brandAjax();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this;
    that.load_brandAjax();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  load_brandAjax() {
    const that = this;
    if(that.data.brand_finished) return;
    if(that.data.brand_loading) return;
    that.setData({
      brand_loading: true
    });
    wx.request({
      url: 'https://m.waitui.com/api/get_brandAjax',
      data: {
        page: that.data.brand_page
      },
      success ({ data }) {
        // 清空列表数据
        if (that.data.brand_refreshing) {
          that.setData({
            brand_list: [],
            brand_refreshing: false
          });
          wx.stopPullDownRefresh();
        }
        that.setData({
          brand_list: that.data.brand_list.concat(data.brand_list),
          brand_page: that.data.brand_page + 1,
          brand_loading: false
        });
        // 数据全部加载完成
        if (data.brand_list.length < 10) {
          that.setData({
            brand_finished: true
          });
        }
      }
    })
  }
  
})
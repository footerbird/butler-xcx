// pages/mark/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_loading: true,
    mark_category: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.load_markSort();
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
  
  load_markSort() {
    const that = this;
    wx.request({
      url: 'https://m.waitui.com/api/get_markSort',
      success ({ data }) {
        that.setData({
          mark_category: data.mark_category,
          page_loading: false
        });
      }
    })
  },
  
})
// pages/domain/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain_list: [],
    domain_page: 1, // 20条一页，每次加载20条
    domain_loading: false,
    domain_finished: false,
    domain_refreshing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.load_domainAjax();
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
      domain_page: 1,
      domain_loading: false,
      domain_finished: false,
      domain_refreshing: true
    });
    that.load_domainAjax();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this;
    that.load_domainAjax();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  load_domainAjax() {
    const that = this;
    if(that.data.domain_finished) return;
    if(that.data.domain_loading) return;
    that.setData({
      domain_loading: true
    });
    wx.request({
      url: 'https://m.waitui.com/api/get_domainAjax',
      data: {
        page: that.data.domain_page
      },
      success ({ data }) {
        // 清空列表数据
        if (that.data.domain_refreshing) {
          that.setData({
            domain_list: [],
            domain_refreshing: false
          });
          wx.stopPullDownRefresh();
        }
        that.setData({
          domain_list: that.data.domain_list.concat(data.domain_list),
          domain_page: that.data.domain_page + 1,
          domain_loading: false
        });
        // 数据全部加载完成
        if (data.domain_list.length < 20) {
          that.setData({
            domain_finished: true
          });
        }
      }
    })
  }
  
})
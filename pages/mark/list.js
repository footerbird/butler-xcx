// pages/mark/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mark_list: [],
    mark_page: 1, // 10条一页，每次加载10条
    mark_loading: false,
    mark_finished: false,
    mark_refreshing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.load_markAjax();
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
      mark_page: 1,
      mark_loading: false,
      mark_finished: false,
      mark_refreshing: true
    });
    that.load_markAjax();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this;
    that.load_markAjax();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  load_markAjax() {
    const that = this;
    if(that.data.mark_finished) return;
    if(that.data.mark_loading) return;
    that.setData({
      mark_loading: true
    });
    wx.request({
      url: 'https://m.waitui.com/api/get_markAjax',
      data: {
        page: that.data.mark_page
      },
      success ({ data }) {
        // 清空列表数据
        if (that.data.mark_refreshing) {
          that.setData({
            mark_list: [],
            mark_refreshing: false
          });
          wx.stopPullDownRefresh();
        }
        that.setData({
          mark_list: that.data.mark_list.concat(data.mark_list),
          mark_page: that.data.mark_page + 1,
          mark_loading: false
        });
        // 数据全部加载完成
        if (data.mark_list.length < 10) {
          that.setData({
            mark_finished: true
          });
        }
      }
    })
  }
  
})
// pages/mark/sort_group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_loading: true,
    mark_category: [],
    category: {
      category_id: '',
      category_code: '',
      category_name: '',
      category_use: '',
      description: '',
      groups: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.load_markSortItem(options.code);
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
  
  toggleLeftMenu(e) {
    const that = this;
    const targetCode = e.currentTarget.dataset.code;
    that.setData({
      'category.category_code': targetCode
    });
    wx.nextTick(() => {
      that.load_markSortItem(targetCode);
    });
  },
  
  load_markSortItem(code) {
    const that = this;
    that.setData({
      'category.groups': []
    });
    wx.request({
      url: 'https://m.waitui.com/api/get_markSortItem',
      data: {
        code: code
      },
      success ({ data }) {
        that.setData({
          mark_category: data.mark_category,
          category: data.category,
          page_loading: false
        });
      }
    })
  }
  
})
// pages/mark/sort_item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_loading: true,
    category: {
      category_id: '',
      category_name: '',
      groups: [],
    },
    group_code: '',
    items: []
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
      group_code: targetCode
    });
    wx.nextTick(() => {
      that.load_markSortItem(targetCode);
    });
  },
  
  load_markSortItem(code) {
    const that = this;
    that.setData({
      items: []
    });
    wx.request({
      url: 'https://m.waitui.com/api/get_markSortItem',
      data: {
        code: code
      },
      success ({ data }) {
        const category_groups = data.category.groups;
        let group_items = [];
        category_groups.map((group) => {
          if (code === group.category_code) {
            group_items = group.items;
          }
          return true;
        });
        that.setData({
          category: data.category,
          group_code: data.group_code,
          items: group_items,
          page_loading: false
        });
      }
    })
  }
  
})
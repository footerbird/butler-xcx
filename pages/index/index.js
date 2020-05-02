// pages/index/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    home_circle: 1, // 品牌周期
    home_solution: 1 // 商标解决方案
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  
  switchCircle(e) {
    const that = this;
    that.setData({
      home_circle: parseInt(e.currentTarget.dataset.circle)
    });
  },
  
  switchSolution(e) {
    const that = this;
    that.setData({
      home_solution: parseInt(e.currentTarget.dataset.solution)
    });
  }
  
})
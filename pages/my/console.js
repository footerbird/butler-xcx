// pages/my/console.js
const app = getApp();
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: null,
    user_balance: '',
    user_score: '',
    unreadCount: '',
    orderCount: '',
    domainCount: '',
    markCount: '',
    company_certify: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      userinfo: app.globalData.userinfo
    });
    if (that.data.userinfo !== null) {
      that.load_myConsole();
    }
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
    const that = this;
    if(that.data.userinfo === null){
      that.setData({
        userinfo: app.globalData.userinfo
      });
      if (that.data.userinfo !== null) {
        that.load_myConsole();
      }
    }
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
  
  logoutSuccess() {
    const that = this;
    Toast.loading({
      message: '正在退出...'
    });
    app.globalData.userinfo = null;
    setTimeout(() => {
      that.setData({
        userinfo: app.globalData.userinfo
      });
    }, 2000);
  },
  
  load_myConsole() {
    const that = this;
    wx.request({
      url: 'https://m.waitui.com/api/get_myConsole',
      data: {
        phone: that.data.userinfo.user_phone,
        token: that.data.userinfo.user_token
      },
      success ({ data }) {
        if (!data.state) {
          that.setData({
            user_balance: data.userinfo.user_balance,
            user_score: data.userinfo.user_score,
            unreadCount: data.unreadCount,
            orderCount: data.orderCount,
            domainCount: data.domainCount,
            markCount: data.markCount,
            company_certify: data.company_certify
          });
        }
      }
    })
  }
  
})
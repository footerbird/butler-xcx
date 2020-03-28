// pages/my/login.js
const app = getApp();
const { Valid } = require('../../utils/util.js');
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_type: 'pwd_login', // 默认密码登录
    phone_num: '',
    code_num: '',
    code_msg: '获取验证码',
    pwd_num: '',
    sending_code: false, // 正在发送验证码
    sending_login: false // 正在登录
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
  
  forbid_code_btn() {
    return !Valid.isMobile(this.data.phone_num) || this.data.sending_code;
  },
  
  forbid_login_btn() {
    const that = this;
    if (that.data.login_type === 'pwd_login') { // 密码登录
      if (Valid.isMobile(that.data.phone_num) && that.data.pwd_num !== '' && !that.data.sending_login) {
        return false;
      }
      return true;
    } // 短信登录
    if (Valid.isMobile(that.data.phone_num) && Valid.isCode6(that.data.code_num) && !that.data.sending_login) {
      return false;
    }
    return true;
  },
  
  switchLoginType() {
    const that = this;
    if (that.data.login_type === 'pwd_login') {
      that.setData({
        login_type: 'sms_login'
      });
    } else {
      that.setData({
        login_type: 'pwd_login'
      });
    }
  },
  
  phoneNumInput(e) {
    const that = this;
    that.setData({
      phone_num: e.detail.value || e.detail
    });
  },
  
  pwdNumInput(e) {
    const that = this;
    that.setData({
      pwd_num: e.detail.value || e.detail
    });
  },
  
  codeNumInput(e) {
    const that = this;
    that.setData({
      code_num: e.detail.value || e.detail
    });
  },
  
  checkPhoneRegister(regCall, unregCall) {
    const that = this;
    wx.request({
      url: 'https://m.waitui.com/api/check_phoneRegisterAjax',
      data: {
        phone: that.data.phone_num
      },
      success ({ data }) {
        if (data.state === 'reg') {
          regCall();
        } else {
          unregCall();
        }
      }
    });
  },
  
  time(seconds) {
    const that = this;
    seconds -= 1;
    if (seconds < 0) {
      that.setData({
        sending_code: false,
        code_msg: '获取验证码'
      });
      return false;
    }
    that.setData({
      code_msg: `发送成功(${seconds})`
    });
    setTimeout(() => {
      that.time(seconds);
    }, 1000);
  },
  
  sendCode(seconds) {
    const that = this;
    if (that.forbid_code_btn()) return false;
    wx.request({
      url: 'https://m.waitui.com/api/send_smsCodeAjax',
      data: {
        phone: that.data.phone_num
      },
      success ({ data }) {
        if (data.state === 'success') {
          that.setData({
            sending_code: true
          });
          that.time(seconds);
        } else {
          Toast(data.msg);
        }
      }
    });
  },
  
  sendCodeLogin() {
    const that = this;
    that.checkPhoneRegister(() => {
      that.sendCode(60);
    }, () => {
      Toast('手机号未注册');
    });
  },
  
  funcLogin() {
    const that = this;
    if (that.forbid_login_btn()) return false;
    that.setData({
      sending_login: true
    });
    wx.request({
      url: 'https://m.waitui.com/api/send_phoneLoginAjax',
      data: {
        login_type: that.data.login_type,
        phone_num: that.data.phone_num,
        pwd_num: that.data.pwd_num,
        code_num: that.data.code_num,
        ip_address: '',
        city_address: ''
      },
      success ({ data }) {
        that.setData({
          sending_login: false
        });
        if (data.state === 'success') {
          Toast(data.msg);
          app.globalData.userinfo = data.userinfo;
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
        } else {
          Toast(data.msg);
        }
      }
    });
  }
  
})
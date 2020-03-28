// pages/my/register.js
const app = getApp();
const { Valid } = require('../../utils/util.js');
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone_reg: '',
    code_reg: '',
    code_msg: '获取验证码',
    pwd_reg: '',
    sending_code: false, // 正在发送验证码
    sending_register: false // 正在注册
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
    return !Valid.isMobile(this.data.phone_reg) || this.data.sending_code;
  },
  
  forbid_register_btn() {
    const that = this;
    if (Valid.isMobile(that.data.phone_reg) && Valid.isCode6(that.data.code_reg)
      && that.data.pwd_reg !== '' && !that.data.sending_register) {
      return false;
    }
    return true;
  },
  
  phoneRegInput(e) {
    const that = this;
    that.setData({
      phone_reg: e.detail.value || e.detail
    });
  },
  
  pwdRegInput(e) {
    const that = this;
    that.setData({
      pwd_reg: e.detail.value || e.detail
    });
  },
  
  codeRegInput(e) {
    const that = this;
    that.setData({
      code_reg: e.detail.value || e.detail
    });
  },
  
  checkPhoneRegister(regCall, unregCall) {
    const that = this;
    wx.request({
      url: 'https://m.waitui.com/api/check_phoneRegisterAjax',
      data: {
        phone: that.data.phone_reg
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
        phone: that.data.phone_reg
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
  
  sendCodeRegister() {
    const that = this;
    that.checkPhoneRegister(() => {
      Toast('手机号已注册');
    }, () => {
      that.sendCode(60);
    });
  },
  
  funcRegister() {
    const that = this;
    if (that.forbid_register_btn()) return false;
    that.setData({
      sending_register: true
    });
    wx.request({
      url: 'https://m.waitui.com/api/send_phoneRegisterAjax',
      data: {
        phone_reg: that.data.phone_reg,
        pwd_reg: that.data.pwd_reg,
        code_reg: that.data.code_reg,
        ip_address: '',
        city_address: ''
      },
      success ({ data }) {
        that.setData({
          sending_register: false
        });
        if (data.state === 'success') {
          Toast(data.msg);
          app.globalData.userinfo = data.userinfo;
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/my/console'
            });
          }, 2000);
        } else {
          Toast(data.msg);
        }
      }
    });
  }
  
})
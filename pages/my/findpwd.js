// pages/my/findpwd.js
const { Valid } = require('../../utils/util.js');
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone_find: '',
    code_find: '',
    code_msg: '获取验证码',
    pwd_find: '',
    sending_code: false, // 正在发送验证码
    sending_findpwd: false // 正在重设
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
    return !Valid.isMobile(this.data.phone_find) || this.data.sending_code;
  },
  
  forbid_findpwd_btn() {
    const that = this;
    if (Valid.isMobile(that.data.phone_find) && Valid.isCode6(that.data.code_find)
      && that.data.pwd_find !== '' && !that.data.sending_findpwd) {
      return false;
    }
    return true;
  },
  
  phoneFindInput(e) {
    const that = this;
    that.setData({
      phone_find: e.detail.value || e.detail
    });
  },
  
  pwdFindInput(e) {
    const that = this;
    that.setData({
      pwd_find: e.detail.value || e.detail
    });
  },
  
  codeFindInput(e) {
    const that = this;
    that.setData({
      code_find: e.detail.value || e.detail
    });
  },
  
  checkPhoneRegister(regCall, unregCall) {
    const that = this;
    wx.request({
      url: 'https://m.waitui.com/api/check_phoneRegisterAjax',
      data: {
        phone: that.data.phone_find
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
        phone: that.data.phone_find
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
  
  sendCodeFindpwd() {
    const that = this;
    that.checkPhoneRegister(() => {
      that.sendCode(60);
    }, () => {
      Toast('手机号未注册');
    });
  },
  
  funcFindpwd() {
    const that = this;
    if (that.forbid_findpwd_btn()) return false;
    that.setData({
      sending_findpwd: true
    });
    wx.request({
      url: 'https://m.waitui.com/api/send_phoneFindpwdAjax',
      data: {
        phone_find: that.data.phone_find,
        pwd_find: that.data.pwd_find,
        code_find: that.data.code_find
      },
      success ({ data }) {
        that.setData({
          sending_findpwd: false
        });
        if (data.state === 'success') {
          Toast(data.msg);
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
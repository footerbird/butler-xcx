// pages/company/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_loading: true,
    company: {
      name: '',
      oper_name: '',
      regist_capi: '',
      real_capi: '',
      status: '',
      start_date: '',
      credit_code: '',
      tax_no: '',
      no: '',
      org_no: '',
      econ_kind: '',
      industry: '',
      check_date: '',
      belong_org: '',
      province: '',
      en_name: '',
      original_name: '',
      insured_person: '',
      staff_size: '',
      business_term: '',
      address: '',
      scope: '',
      contact_phone: '',
      contact_email: '',
      contact_address: '',
      certify_status: '',
    },
    brand_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.load_companyDetail(options.company_id);
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
  
  load_companyDetail(company_id) {
    const that = this;
    wx.request({
      url: 'https://m.waitui.com/api/get_companyDetail',
      data: {
        company_id: company_id
      },
      success ({ data }) {
        that.setData({
          company: data.company,
          brand_list: data.brand_list,
          page_loading: false
        });
      }
    })
  }
  
})
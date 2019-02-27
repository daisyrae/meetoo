var TOKEN = '';

class ONE {
  constructor() {
    this.ONE = 'http://m.wufazhuce.com/one/ajaxlist/';
    this.COOKIE = '';
  }

  /**
   * 获取token
   */
  getToken() {
    return new Promise((RES, REJ) => {
      if (TOKEN) return RES(TOKEN);
      wx.request({
        url: 'http://m.wufazhuce.com/one',
        responseType: 'text',
        success: ret => {
          this.COOKIE = ret.header['Set-Cookie'];
          var _token = ret.data.split("One.token = '")[1].split("'")[0];
          if (_token && (_token.length === 40)) {
            TOKEN = _token;
            return RES(_token);
          }
          REJ()
        },
        fail: REJ
      })
    })
  }

  /**
   * 获取数据
   */
  getData(page = 0) {
    return new Promise((RES, REJ) => {
      this.getToken().then(token => {
        var url = this.ONE + page + '?_token=' + token;
        wx.request({
          url,
          header: {
            'Cookie': this.COOKIE
          },
          success: data => {
            RES(data);
          },
          fail: REJ
        })
      })
    });
  }
}

module.exports = new ONE();
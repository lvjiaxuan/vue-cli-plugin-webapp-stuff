import axios from 'axios'
import wx from 'weixin-js-sdk'
import sha1 from 'sha1'

/**
 * **initNewShareInfo 和 initShareInfoDeprecated 只能选择其一使用**
 */

/**
 * @method 获取签名凭证jsapi_ticket
 */
const initJsapiTicket = () => {

  return new Promise((resolve, reject) => {

    axios.get(process.env.VUE_APP_TICKETURL).then(res => {

      if(res.data.ret !== 0) return reject(res.data);

      const appId = res.data.model.appId;
      const jsApiTicket = res.data.model.jsapi_ticket;
      const timestamp = new Date().getTime();
      const nonceStr = timestamp + parseInt(Math.random() * 100000);
      const signature = sha1('jsapi_ticket=' + jsApiTicket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + window.location.href.split('#')[0]);

      wx.config({
        debug: process.env.NODE_ENV !== 'production',
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareWeibo',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareQZone',
          'hideMenuItems'
        ]
      });

      wx.ready(resolve);
      wx.error(reject);
    });
  });
}

/**
 * common 接口
 * 
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
const initCommon = shareInfo => {

  wx.onMenuShareWeibo({ // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
    ...shareInfo,
    success: successCallback,
    fail: res => console.log('fail onMenuShareWeibo', res.errMsg),
  });
}

/**
 * @method 新版有效接口
 */
const initNewShareInfo = shareInfo => {

  wx.updateAppMessageShareData({ // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    ...shareInfo,
    success: () => { /* 设置成功 */ },
    fail: res => console.log('fail updateAppMessageShareData：', res.errMsg),
  });

  wx.updateTimelineShareData({ // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
    ...shareInfo,
    success: () => { /* 设置成功 */ },
    fail: res => console.log('fail updateTimelineShareData：', res.errMsg),
  });
}

/**
 * @method 废弃接口
 * @desc 以下即将废弃api没有自定义
 * - onMenuShareTimeline 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
 * - onMenuShareAppMessage 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
 * - onMenuShareQQ 获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）
 * - onMenuShareQZone 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃）
 */
const initShareInfoDeprecated = (shareInfo, successCallback) => {

  wx.onMenuShareTimeline({ // deprecated：分享到朋友圈
    ...shareInfo,
    success: successCallback,
    fail: res => console.log('fail onMenuShareTimeline：', res.errMsg),
  });

  wx.onMenuShareAppMessage({ // deprecated：分享给wx朋友
    ...shareInfo,
    success: successCallback,
    fail: res => console.log('fail onMenuShareAppMessage：', res.errMsg),
  });

  wx.onMenuShareQQ({ // deprecated：分享到QQ
    ...shareInfo,
    success: successCallback,
    fail: res => console.log('fail onMenuShareQQ', res.errMsg),
  });

  wx.onMenuShareQZone({// deprecated：分享到QQ空间
    ...shareInfo,
    success: successCallback,
    fail: res => console.log('fail onMenuShareQZone', res.errMsg),
  });
}

export default ({
  title = '分享标题',
  desc = '分享描述',
  link = window.location.href.split('#')[0],
  imgUrl = '',
  successCallback = () => {}
} = {}, newVersion = false) => {

  const shareInfo = { title, desc, link, imgUrl }

  if(sessionStorage.getItem('wxshare')) {

    // wx.hideMenuList({ menuList: [
    //   'menuItem:copyUrl',
    //   'menuItem:share:weiboApp',
    //   'menuItem:openWithSafari',
    //   'menuItem:share:email',
    //   'menuItem:openWithQQBrowser',
    //   'menuItem:share:qq'
    // ]});

    initCommon(shareInfo, successCallback);
    newVersion ? initNewShareInfo(shareInfo) : initShareInfoDeprecated(shareInfo, successCallback);
    return Promise.resolve();
  } else {

    return initJsapiTicket().then(() => {

      sessionStorage.setItem('wxshare', 'wxshare');
      initCommon(shareInfo, successCallback);
      newVersion ? initNewShareInfo(shareInfo) : initShareInfoDeprecated(shareInfo, successCallback);
    });
  }
}
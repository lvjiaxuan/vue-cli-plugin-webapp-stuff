# preset说明

> `isSeparation`：若不是前后端分离，则忽略`ServiceUrl`
> 
> `isIndexHtml`：若是使用jsp，资源版本号则使用el表达式控制

```json
{
  "tinifyKey": "熊猫压缩key",
  "ticketUrl": "获取微信分享ticket",

  "prodServiceUrl": "生产环境服务域名",
  "prodResourcePath": "生产环境cdn路径",
  "sitServiceUrl": "测试环境服务域名",
  "sitResourcePath": "测试环境cdn路径",

  "isSeparation": "是否完全前后端分离，0:false，1:true",
  "isIndexHtml": "index是html还是jsp，0:false，1:true",

  "prodWebConfig": {
    "ssh": {
      "host": "",
      "port": 0,
      "username": "",
      "password": ""
    },
    "remotePath": ""
  },

  "sitWebConfig": {
    "ssh": {
      "host": "",
      "port": 0,
      "username": "",
      "password": ""
    },
    "remotePath": ""
  },

  "cdnConfig": {
    "ssh": {
      "host": "4",
      "port": 0,
      "username": "",
      "passphrase": "",
      "privateKey": ""
    },
    "remotePath": ""
  } 
}
```
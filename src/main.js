import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
        'pages/模块/main',
        "^pages/模块/订阅/main",
        "pages/模块/首页/main",
        "pages/模块/我的/main",
        "pages/模块/详情/main",
        "pages/模块/详情/评论详情/main",
        "pages/模块/分享/main",
        "pages/模块/我的/消息/main",
        "pages/模块/我的/反馈/main",
        "pages/模块/我的/帮助/main",
        "pages/模块/我的/设置/main",
        "pages/模块/我的/推荐/main",
        "pages/模块/我的/消息/收到的赞/main",
        "pages/模块/我的/消息/详情/main",
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
        color: "#9DABC0",
        selectedColor: "#23ABE2",
        borderStyle: "#EFEFEF",
        backgroundColor: "#FFFFFF",
        list: [
            {
                pagePath: "pages/模块/订阅/main",
                iconPath: "static/assets/icon/tabBar/icon-subscribe.png",
                selectedIconPath: "static/assets/icon/icon-subscribe-check.png"
            },
            {
                pagePath: "pages/模块/首页/main",
                iconPath: "static/assets/icon/tabBar/icon-index.png",
                selectedIconPath: "static/assets/icon/icon-index-check.png"
            },
            {
                pagePath: "pages/模块/我的/main",
                iconPath: "static/assets/icon/tabBar/icon-me.png",
                selectedIconPath: "static/assets/icon/tabBar/icon-me-check.png"
            },
        ]
    }
  }
}

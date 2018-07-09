<template>
    <div class="subscribe">
        <div class="subscribe-header">
            <div class="header-left">
                <span class="title">订阅</span>
                <span class="sub-title">{{filterSelectItem.title}}</span>
                <span class="number">{{filterSelectItem.number}}</span>
            </div>
            <div class="header-right">
                <img @click="showFilter"
                     :src=" !filterClick? '/static/assets/icon/icon-filter.png':'/static/assets/icon/icon-filter-check.png'">
                <img @click="showSubscribe"
                     :src=" !subscribeClick ? '/static/assets/icon/icon-add.png':'/static/assets/icon/icon-add-cancel.png'">
            </div>
        </div>
        <div class="subscribe-dialog-list"
             :class="{show: showFilterDialog}">
            <div v-for="item in statisticList"
                 :key="item.status"
                 @click="filterTitle(item)">
                <div class="block">
                    <span class="title">{{item.title}}</span>
                    <span class="number">{{item.number}}</span>
                </div>
                <img class="all"
                     v-if="item.status==2"
                     src="/static/assets/icon/icon-price-all.png">
                <img class="down"
                     v-if="item.status==1"
                     src="/static/assets/icon/icon-price-down.png">
                <img class="up"
                     v-if="item.status==-1"
                     src="/static/assets/icon/icon-price-up.png">
                <img class="mild"
                     v-if="item.status==0"
                     src="/static/assets/icon/icon-price-mild.png">
            </div>
        </div>
        <div class="subscribe-dialog-add"
             :class="{show: showSubscribeDialog}">
            <div class="subscribe-add-top">
                <div class="link-paste">
                    <input type="text"
                           v-model="urlLink"
                           placeholder="粘贴商品链接到这里"
                           placeholder-style="color: #9DACBF;">
                    <div class="block">
                        <img v-if="urlLink"
                             @click="clearLink"
                             src="/static/assets/icon/icon-url-cancel.png">
                        <img @click="searchLink"
                             src="/static/assets/icon/icon-url-tab.png">
                    </div>
                </div>

            </div>
            <div class="subscribe-add-content"
                 v-if="!findUrlResult==0">
                <template v-if="findUrlResult==1">
                    <subscribe-item-card :showType=1
                                         :commodity="searchCommodity">
                    </subscribe-item-card>
                    <div class="click-subscribe"
                         @click="addToCommodityList">
                        立即订阅
                    </div>
                </template>
                <div class="commodity-none"
                     v-if="findUrlResult==-1">
                    未找到此商品
                </div>
            </div>
        </div>
        <scroll-view :scroll-y="true"
                     enable-back-to-top
                     class="scroll-wrapper">

            <div class="subscribe-content"
                 :class="{empty:subscribeTotalNumber==0}">
                <template v-if="subscribeTotalNumber==0">
                    <img class="empty-img"
                         src="/static/assets/icon/icon-subscribe-empty.png">
                    <span class="empty-txt">添加订阅</span>
                </template>
                <template v-else>
                    <subscribe-item-card :showType=2
                                         :commodity="item"
                                         v-for="item in displayCommodityList"
                                         :key="item.name">
                    </subscribe-item-card>
                </template>
            </div>
        </scroll-view>
        <div class="mask-layer"
             v-if="showMask">
        </div>
        <div class="clip-mask"
             v-if="clipBoard">
            <div class="tip">
                <span class="top">小助手提示</span>
                <span class="center">查看剪切板中的链接?</span>
                <div class="operation">
                    <span class="cancel"
                          @click="operationCancel">取消</span>
                    <span class="conform"
                          @click="operationConform">确定</span>
                </div>
            </div>
        </div>

    </div>
</template>
 
<script>
import subscribeItemCard from "@/components/subscribe-item-card";
import Core from "core/core";

export default {
    components: {
        subscribeItemCard
    },

    data() {
        return {
            util: Core.Util,
            logs: [],
            filterClick: false,
            subscribeClick: false,
            addClick: false,
            showMask: false,
            showFilterDialog: false,
            showSubscribeDialog: false,
            urlLink: "",
            findUrlResult: 0,
            subscribeTotalNumber: 1,
            statisticList: [
                { title: "全部", status: 2, number: 20 },
                { title: "降价", status: 1, number: 4 },
                { title: "涨价", status: -1, number: 6 },
                { title: "平稳", status: 0, number: 10 }
            ],
            // showType 普通样式  带有价格波动样式  发现的样式
            commodityList: [
                {
                    name: "LED调节式金属组合桌灯",
                    comment: 20,
                    // 1:taobao  2:jingdong
                    from: 1,
                    price: 180,
                    former: 380,
                    //0平稳  1降价   -1 升价
                    status: 1,
                    change: 200,
                    img: "/static/assets/image/commodity-1.png"
                },
                {
                    name: "LED调节式金属组合桌灯",
                    comment: 10,
                    from: 1,
                    price: 180,
                    former: 180,
                    status: 0,
                    change: 0,
                    img: "/static/assets/image/commodity-2.png"
                },
                {
                    name: "LED调节式金属组合桌灯",
                    comment: 0,
                    from: 1,
                    price: 380,
                    former: 180,
                    status: -1,
                    change: 200,
                    img: "/static/assets/image/commodity-1.png"
                }
            ],
            displayCommodityList: [],
            clipBoard: "",
            filterSelectItem: {},
            searchCommodity: {}
        };
    },
    computed: {},
    mounted() {
        const logs = wx.getStorageSync("logs") || [];
        this.initData();
        this.getClipBoard();
    },
    methods: {
        initData() {
            this.statisticNumber();
            this.displayCommodityList = this.commodityList;
            this.filterSelectItem = this.statisticList[0];
        },
        getClipBoard() {
            wx.getClipboardData({
                success: res => {
                    var re = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
                    if (re.test(res.data)) {
                        this.clipBoard = re.exec(res.data)[0];
                        console.log(this.clipBoard);
                    }
                }
            });
        },
        setClipBoard() {
            wx.setClipboardData({
                data: this.clipBoard
            });
        },
        // *16瓶整箱】http://m.tb.cn/h.31JWyQr 点击链接，再选择浏览器咑閞；或復·制这段描述
        showSubscribe() {
            if (this.subscribeClick == true) {
                this.subscribeClick = false;
                this.showMask = false;
                this.showSubscribeDialog = false;
            } else {
                this.subscribeClick = true;
                this.showMask = true;
                this.showSubscribeDialog = true;
                this.showFilterDialog = false;
                this.filterClick = false;
            }
        },
        showFilter() {
            if (this.filterClick == true) {
                this.filterClick = false;
                this.showMask = false;
                this.showFilterDialog = false;
            } else {
                this.filterClick = true;
                this.showMask = true;
                this.showFilterDialog = true;
                this.showSubscribeDialog = false;
                this.subscribeClick = false;
            }
        },
        searchLink() {
            if (this.urlLink) {
                //这里访问接口 成功回调拿到item 然后点击订阅的话就push进去
                if (this.urlLink == "aaa") {
                    this.findUrlResult = 1;
                    this.searchCommodity = this.commodityList[0];
                } else {
                    this.findUrlResult = -1;
                }
            }
        },
        clearLink() {
            this.urlLink = "";
            this.findUrlResult = 0;
            this.searchCommodity = {};
        },
        addToCommodityList() {
            this.subscribeClick = false;
            this.showMask = false;
            this.showSubscribeDialog = false;
            //首先判断是否已经订阅 有就提示已经有  无就添加进去
            if (this.searchCommodity) {
                this.commodityList.push(this.searchCommodity);
            }
            this.statisticNumber();
            this.filterTitle(this.filterSelectItem);
        },

        operationCancel() {
            this.clipBoard = "";
            // this.setClipBoard();
        },
        operationConform() {
            let forTap = this.clipBoard;
            this.clipBoard = "";
            this.setClipBoard();
            this.util.go("/pages/模块/详情/main");
        },
        statisticNumber() {
            this.statisticList.map(item => {
                item.number = 0;
            });
            this.commodityList.map(item => {
                switch (item.status) {
                    case 1:
                        this.statisticList[1].number++;
                        break;
                    case -1:
                        this.statisticList[2].number++;
                        break;
                    case 0:
                        this.statisticList[3].number++;
                        break;
                }
            });
            this.statisticList[0].number = this.commodityList.length;
        },
        filterTitle(item) {
            this.filterSelectItem = item;
            this.filterClick = false;
            this.showMask = false;
            this.showFilterDialog = false;
            let pointer = item.status;
            this.displayCommodityList = [];
            if (pointer == 2) {
                this.displayCommodityList = this.commodityList;
            } else {
                this.commodityList.map(item => {
                    if (item.status == pointer)
                        this.displayCommodityList.push(item);
                });
            }
        }
    }
};
</script>

<style scoped lang="scss">
// 页面,订阅,dialog,tip z-index:2,5,4,5
.subscribe {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    .subscribe-header {
        padding: 6px 20px 14px;
        // height: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 5;
        background: #ffffff;
        .header-left {
            .title {
                font-size: 22px;
                color: #333333;
                margin-right: 20px;
                font-weight: 500;
            }
            .sub-title {
                font-size: 14px;
                color: #697482;
                margin-right: 10px;
            }
            .number {
                padding: 1px 10px;
                font-size: 14px;
                color: #697482;
                text-align: center;
                background: #f2f6fa;
                border-radius: 100px;
            }
        }
        .header-right {
            img {
                width: 20px;
                height: 20px;
                margin-left: 30px;
            }
        }
    }
    .subscribe-dialog-list {
        display: flex;
        flex-direction: column;
        height: 204px;
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        background: #ffffff;
        z-index: 4;
        transform: translate3d(0, -100%, 0);
        &.show {
            transform: translate3d(0, 0, 0);
        }
        > div {
            display: flex;
            border-top: 1px solid #e8ebed;
            justify-content: space-between;
            height: 50px;
            align-items: center;
            padding: 0 20px;
            .block {
                .title {
                    font-size: 16px;
                    color: #333333;
                }
                .number {
                    margin-left: 10px;
                    background: #f2f6fa;
                    border-radius: 100px;
                    font-size: 14px;
                    color: #697482;
                    padding: 1px 8px;
                }
            }
            img {
                height: 12px;
                width: 12px;
                &.down {
                    width: 7px;
                    margin-right: 3px;
                    height: 14px;
                }
                &.up {
                    width: 7px;
                    height: 14px;
                    margin-right: 3px;
                }
                &.mild {
                    height: 2px;
                    width: 10px;
                    margin-right: 1px;
                }
            }
        }
    }
    .subscribe-dialog-add {
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        z-index: 4;
        transform: translate3d(0, -100%, 0);
        &.show {
            transform: translate3d(0, 0, 0);
        }
        .subscribe-add-top {
            height: 84px;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            .link-paste {
                height: 44px;
                background: #f2f6fa;
                border: 1px solid #e7eef2;
                border-radius: 4px;
                width: 335px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                input {
                    font-size: 14px;
                    color: #333333;
                    padding-left: 14px;
                    flex: 1;
                    margin-right: 14px;
                }
                .block {
                    height: 20px;
                    img {
                        width: 20px;
                        height: 20px;
                        padding-right: 14px;
                    }
                }
            }
        }
        .subscribe-add-content {
            display: flex;
            align-items: center;
            background: #f2f6fa;
            flex-direction: column;
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 10px;
            .click-subscribe {
                background: #2976fe;
                border-radius: 4px;
                font-size: 14px;
                color: #ffffff;
                width: 100%;
                text-align: center;
                padding: 12px 0;
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .commodity-none {
                margin-top: 6px;
                margin-bottom: 16px;
                font-size: 14px;
                color: #9dacbf;
            }
        }
    }
    .scroll-wrapper {
        display: flex;
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        background: #f2f6fa;
        .subscribe-content {
            flex: 1;
            display: flex;
            background: #f2f6fa;
            flex-direction: column;
            padding: 0 10px;

            &.empty {
                align-items: center;
                justify-content: center;
            }
            .empty-img {
                width: 69px;
                height: 69px;
            }
            .empty-txt {
                font-size: 14px;
                color: #9dacbf;
                margin-top: 20px;
            }
        }
    }

    .mask-layer {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 3;
        // transform: translate3d(0, 100%, 0);
        &.hide {
            transform: translate3d(0, 100%, 0);
        }
        &.show {
            transform: translate3d(0, 0, 0);
        }
    }
    .clip-mask {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 6;
    }
    .tip {
        display: flex;
        flex-direction: column;
        width: 273px;
        height: 163px;
        background: #ffffff;
        border-radius: 6px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -136px;
        margin-top: -81px;
        z-index: 5;
        align-items: center;
        // display: none;
        .center {
            margin-top: 20px;
            font-size: 16px;
            color: #333333;
        }
        .top {
            margin-top: 20px;
            font-size: 14px;
            color: #697482;
        }
        .operation {
            border-top: 1px solid #e8ebed;
            margin-top: 30px;
            width: 100%;
            display: flex;
            align-items: center;
            height: 50px;
            .conform {
                height: 50px;
                line-height: 49px;
                font-size: 16px;
                color: #2976fe;
                flex: 1;
                border-left: 1px solid #e8ebed;
                text-align: center;
            }
            .cancel {
                height: 50px;
                line-height: 49px;
                font-size: 16px;
                color: #333333;
                flex: 1;
                text-align: center;
            }
        }
    }
}
</style>
